import { randomBytes } from "crypto";
import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { APPROVAL_FLOW } from "../utils/constants.js";
import { generateToken } from "../utils/helpers.js";

export const createApprovalLink = async (requestId, type, expiresIn = 24) => {
  const request = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    include: { approvalLinks: true },
  });

  if (!request) {
    throw new ApiError(404, "Service request not found");
  }

  // Check if an active approval link of this type already exists
  const existingLink = request.approvalLinks.find(
    (link) => link.type === type && !link.isUsed && link.expiresAt > new Date()
  );

  if (existingLink) {
    throw new ApiError(409, `Active ${type} approval link already exists`);
  }

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresIn);

  return prisma.approvalLink.create({
    data: {
      token: generateToken(),
      type,
      requestId,
      expiresAt,
    },
  });
};

export const getApprovalLinkByRequestId = async (requestId) => {
  return prisma.approvalLink.findMany({
    where: { requestId },
    include: {
      request: true,
    },
  });
};

export const verifyToken = async (token) => {
  const approvalLink = await prisma.approvalLink.findUnique({
    where: { token },
    include: {
      request: {
        include: {
          employeeOrders: {
            include: {
              orderItems: {
                include: {
                  menuItem: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!approvalLink) {
    throw new ApiError(404, "Invalid approval link");
  }

  if (approvalLink.isUsed) {
    throw new ApiError(400, "This approval link has already been used");
  }

  if (approvalLink.expiresAt < new Date()) {
    throw new ApiError(400, "This approval link has expired");
  }

  return approvalLink;
};

export const processResponse = async (token, response, responseNote) => {
  const approvalLink = await verifyToken(token);
  const { type } = approvalLink;
  const flow = APPROVAL_FLOW[type];

  if (!flow) {
    throw new ApiError(400, "Invalid approval type");
  }

  return prisma.$transaction(async (prisma) => {
    // Mark current approval link as used
    const updatedLink = await prisma.approvalLink.update({
      where: { token },
      data: {
        isUsed: true,
        response,
        responseNote,
        respondedAt: new Date(),
      },
    });

    const newToken = generateToken();
    let newStatus;
    if (response) {
      // Approved
      newStatus = flow.nextStatus;

      // If there's a next approval stage, create its approval link
      if (flow.nextApproval) {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        await prisma.approvalLink.create({
          data: {
            token: newToken,
            type: flow.nextApproval,
            requestId: approvalLink.requestId,
            expiresAt,
          },
        });

        // Fetch to send meal message
        const response = await fetch(
          "http://localhost:4200/api/messages/confirm-to-ga",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: "6287733760363",

              approvalToken: newToken,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
    } else {
      // Rejected
      newStatus = flow.rejectStatus;
    }

    // Update request status
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: approvalLink.requestId },
      data: {
        status: newStatus,
        statusHistory: {
          create: {
            status: newStatus,
            changedBy: type,
            notes:
              responseNote ||
              `${response ? "Approved" : "Rejected"} by ${type}`,
          },
        },
      },
      include: {
        approvalLinks: true,
        statusHistory: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return {
      approvalLink: updatedLink,
      request: updatedRequest,
    };
  });
};

export const deleteApprovalLink = async (requestId) => {
  try {
    await prisma.approvalLink.deleteMany({
      where: { requestId },
    });
    return true;
  } catch (error) {
    if (error.code === "P2025") {
      return false;
    }
    throw error;
  }
};
