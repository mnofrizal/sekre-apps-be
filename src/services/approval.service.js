import { randomBytes } from "crypto";
import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { APPROVAL_FLOW, WA_URL } from "../utils/constants.js";
import { generateToken } from "../utils/helpers.js";
import sharp from "sharp";
import * as notificationService from "./notification.service.js";

const compressAndConvertImage = async (imagePath) => {
  try {
    const compressedImageBuffer = await sharp(imagePath)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    return compressedImageBuffer.toString("base64");
  } catch (error) {
    console.error("Error compressing image:", error);
    return null;
  }
};

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

export const processResponse = async (token, response, responseNote, image) => {
  const approvalLink = await verifyToken(token);
  const { type } = approvalLink;
  console.log({ type });
  const flow = APPROVAL_FLOW[type];

  console.log(flow.nextApproval);

  console.log({ image });

  if (!flow) {
    throw new ApiError(400, "Invalid approval type");
  }

  let result;
  const newToken = generateToken();
  let newStatus;

  try {
    // Database transaction
    result = await prisma.$transaction(async (prisma) => {
      // Mark current approval link as used
      const updatedLink = await prisma.approvalLink.update({
        where: { token },
        data: {
          isUsed: true,
          response,
          responseNote,
          respondedAt: new Date(),
          image: image || null, // Add image path if provided
        },
      });

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
          handler: {
            select: {
              id: true,
            },
          },
        },
      });

      // Send push notifications
      try {
        // Notify admin
        await notificationService.sendNotificationToRole("ADMIN", {
          title: "Order Update",
          body: response
            ? `Order #${approvalLink.requestId} approved by ${type}`
            : `Order #${approvalLink.requestId} rejected by ${type}`,
          data: {
            type: "order_update",
            orderId: approvalLink.requestId,
            status: newStatus,
          },
        });

        // Notify request handler
        await notificationService.sendNotificationToUsers(
          [updatedRequest.handler.id],
          {
            title: "Order Update",
            body: response
              ? type === "KITCHEN"
                ? `Pesanan Anda #${approvalLink.requestId} telah diproses oleh ${type}`
                : type === "KITCHEN_DELIVERY"
                ? `Pesanan Anda #${approvalLink.requestId} telah selesai dikirimkan`
                : `Pesanan Anda #${approvalLink.requestId} telah disetujui oleh ${type}`
              : `Pesanan Anda #${approvalLink.requestId} telah ditolak oleh ${type}`,
            data: {
              type: "order_update",
              orderId: approvalLink.requestId,
              status: newStatus,
            },
          }
        );

        if (flow.nextApproval === "KITCHEN") {
          // Notify kitchen
          // Send push notification to kitchen staff
          await notificationService.sendNotificationToRole("KITCHEN", {
            title: `Pesanan Baru #${approvalLink.requestId}`,
            body: `Segera klik disini untuk melakukan konfirmasi pesanan #${approvalLink.requestId}`,
            data: {
              type: "kitchen_new_order",
              orderId: approvalLink.requestId,
            },
          });
        }
      } catch (error) {
        console.error("Error sending push notifications:", error);
        // Don't throw error since notification failure shouldn't affect the approval process
      }

      return {
        approvalLink: updatedLink,
        request: updatedRequest,
      };
    });

    // After successful transaction, send WhatsApp notification if needed
    if (response) {
      if (flow.nextApproval === "GA") {
        try {
          // Get admin group ID
          const adminGroup = await prisma.group.findFirst({
            where: {
              type: "ADMIN",
            },
            select: {
              groupId: true,
            },
          });

          // Only send WhatsApp notification if admin group exists
          if (adminGroup) {
            console.log(
              "Sending WhatsApp notification to admin group:",
              adminGroup.groupId
            );
            const notifResponse = await fetch(
              `${WA_URL}/api/messages/confirm-to-ga`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: approvalLink.request.id,
                  groupId: adminGroup.groupId,
                  judulPekerjaan: approvalLink.request.judulPekerjaan,
                  subBidang:
                    approvalLink.request.supervisor?.subBidang || "Kosong",
                  requiredDate: approvalLink.request.requiredDate,
                  requestDate: approvalLink.request.requestDate,
                  category: approvalLink.request.category,
                  dropPoint: approvalLink.request.dropPoint,
                  totalEmployees: approvalLink.request.employeeOrders.length,
                  employeeOrders: approvalLink.request.employeeOrders,
                  pic: approvalLink.request.pic.name,
                  picPhone: approvalLink.request.pic.nomorHp,
                  approvalToken: newToken,
                }),
              }
            );
            if (!notifResponse.ok) {
              const errorMessage = await notifResponse.text();
              console.error(
                "Failed to send WhatsApp notification:",
                notifResponse.status,
                errorMessage
              );
            }
          }
        } catch (error) {
          console.error("Error sending WhatsApp notification:", error);
        }
      } else if (flow.nextApproval === "KITCHEN") {
        // This is the end of approval flow, send notification to kitchen

        try {
          // Get kitchen group ID
          const kitchenGroup = await prisma.group.findFirst({
            where: {
              type: "KITCHEN",
            },
            select: {
              groupId: true,
            },
          });

          // Only send WhatsApp notification if kitchen group exists
          if (kitchenGroup) {
            console.log("Sending WhatsApp notification to kitchen");
            const notifResponse = await fetch(
              `${WA_URL}/api/messages/confirm-to-kitchen`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: approvalLink.request.id,
                  groupId: kitchenGroup.groupId,
                  judulPekerjaan: approvalLink.request.judulPekerjaan,
                  subBidang:
                    approvalLink.request.supervisor?.subBidang || "Kosong",
                  requiredDate: approvalLink.request.requiredDate,
                  requestDate: approvalLink.request.requestDate,
                  category: approvalLink.request.category,
                  dropPoint: approvalLink.request.dropPoint,
                  totalEmployees: approvalLink.request.employeeOrders.length,
                  employeeOrders: approvalLink.request.employeeOrders,
                  pic: approvalLink.request.pic.name,
                  picPhone: approvalLink.request.pic.nomorHp,
                  approvalToken: newToken,
                }),
              }
            );
            if (!notifResponse.ok) {
              const errorData = await notifResponse.text();
              console.error(
                "Failed to send WhatsApp notification to kitchen:",
                notifResponse.status,
                errorData
              );
            }
          }
        } catch (error) {
          console.error(
            "Error sending WhatsApp notification to kitchen:",
            error.message || error
          );
        }
      } else if (
        !flow.nextApproval ||
        (flow.nextApproval !== "GA" && flow.nextApproval !== "KITCHEN")
      ) {
        // Send finish notification when there's no next approval or when next approval is not GA/KITCHEN
        try {
          // Get notification group ID
          const notifGroup = await prisma.group.findFirst({
            where: {
              type: "NOTIF",
            },
            select: {
              groupId: true,
            },
          });

          if (notifGroup) {
            console.log("Sending finish notification to notification group");
            const notifResponse = await fetch(
              `${WA_URL}/api/messages/send-finish-notif`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: approvalLink.request.id,
                  groupId: notifGroup.groupId,
                  judulPekerjaan: approvalLink.request.judulPekerjaan,
                  subBidang:
                    approvalLink.request.supervisor?.subBidang || "Kosong",
                  totalEmployees: approvalLink.request.employeeOrders.length,
                  requiredDate: approvalLink.request.requiredDate,
                  category: approvalLink.request.category,
                  dropPoint: approvalLink.request.dropPoint,
                  pic: approvalLink.request.pic.name,
                  image: image ? await compressAndConvertImage(image) : null,
                }),
              }
            );

            if (!notifResponse.ok) {
              const errorData = await notifResponse.text();
              console.error(
                "Failed to send finish notification:",
                notifResponse.status,
                errorData
              );
            }
          }
        } catch (error) {
          console.error(
            "Error sending finish notification:",
            error.message || error
          );
        }
      }
    } else {
      // Send reject notification if response is false
      try {
        if (approvalLink.request.status === "PENDING_SUPERVISOR") {
          // For PENDING_SUPERVISOR, send to ASMAN's phone
          console.log("Sending reject notification to ASMAN");
          const notifResponse = await fetch(
            `${WA_URL}/api/messages/send-reject-notif`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: approvalLink.request.id,
                phone: `62${approvalLink.request.supervisor?.nomorHp}`, // ASMAN phone number
                judulPekerjaan: approvalLink.request.judulPekerjaan,
                subBidang:
                  approvalLink.request.supervisor?.subBidang || "Kosong",
                totalEmployees: approvalLink.request.employeeOrders.length,
                requiredDate: approvalLink.request.requiredDate,
                category: approvalLink.request.category,
                dropPoint: approvalLink.request.dropPoint,
                pic: approvalLink.request.pic.name,
                rejectedBy: type,
                rejectionNote: responseNote || "No reason provided",
              }),
            }
          );

          if (!notifResponse.ok) {
            const errorData = await notifResponse.text();
            console.error(
              "Failed to send reject notification to ASMAN:",
              notifResponse.status,
              errorData
            );
          }
        } else if (approvalLink.request.status === "PENDING_GA") {
          // For PENDING_GA, send to admin group
          const adminGroup = await prisma.group.findFirst({
            where: {
              type: "ADMIN",
            },
            select: {
              groupId: true,
            },
          });

          if (adminGroup) {
            console.log("Sending reject notification to admin group");
            const notifResponse = await fetch(
              `${WA_URL}/api/messages/send-reject-notif`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: approvalLink.request.id,
                  groupId: adminGroup.groupId,
                  phone: `62${approvalLink.request.supervisor?.nomorHp}`, // ASMAN phone number
                  judulPekerjaan: approvalLink.request.judulPekerjaan,
                  subBidang:
                    approvalLink.request.supervisor?.subBidang || "Kosong",
                  totalEmployees: approvalLink.request.employeeOrders.length,
                  requiredDate: approvalLink.request.requiredDate,
                  category: approvalLink.request.category,
                  dropPoint: approvalLink.request.dropPoint,
                  pic: approvalLink.request.pic.name,
                  rejectedBy: type,
                  rejectionNote: responseNote || "No reason provided",
                }),
              }
            );

            if (!notifResponse.ok) {
              const errorData = await notifResponse.text();
              console.error(
                "Failed to send reject notification to admin group:",
                notifResponse.status,
                errorData
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "Error sending reject notification:",
          error.message || error
        );
      }
    }

    return result;
  } catch (error) {
    console.error("Error in processResponse:", error);
    throw error;
  }
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

export const processOrderByKitchen = async (requestId) => {
  try {
    // Find the service request
    const request = await prisma.serviceRequest.findUnique({
      where: { id: requestId },
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
    });

    if (!request) {
      throw new ApiError(404, "Service request not found");
    }

    if (request.status !== "PENDING_KITCHEN") {
      throw new ApiError(400, "Order is not in PENDING_KITCHEN status");
    }

    // Update service request status to IN_PROGRESS
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: requestId },
      data: {
        status: "IN_PROGRESS",
      },
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
        handler: {
          select: {
            id: true,
          },
        },
      },
    });

    // Send push notifications
    try {
      // Notify admin
      await notificationService.sendNotificationToRole("ADMIN", {
        title: "Order Update",
        body: `Order #${requestId} is now in progress by kitchen`,
        data: {
          type: "order_update",
          orderId: requestId,
          status: "IN_PROGRESS",
        },
      });

      // Notify request handler
      await notificationService.sendNotificationToUsers(
        [updatedRequest.handler.id],
        {
          title: "Order Update",
          body: `Your order #${requestId} is now being processed by kitchen`,
          data: {
            type: "order_update",
            orderId: requestId,
            status: "IN_PROGRESS",
          },
        }
      );
    } catch (error) {
      console.error("Error sending push notifications:", error);
      // Don't throw error since notification failure shouldn't affect the process
    }

    // Send notification to notification group about kitchen starting to process the order
    try {
      // Get notification group ID
      const notifGroup = await prisma.group.findFirst({
        where: {
          type: "NOTIF",
        },
        select: {
          groupId: true,
        },
      });

      if (notifGroup) {
        const notifResponse = await fetch(
          `${WA_URL}/api/messages/send-start-notif`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: request.id,
              groupId: notifGroup.groupId,
              judulPekerjaan: request.judulPekerjaan,
              subBidang: request.supervisor?.subBidang,
              totalEmployees: request.employeeOrders.length,
              requiredDate: request.requiredDate,
              category: approvalLink.request.category,
              dropPoint: request.dropPoint,
              pic: request.pic.name,
            }),
          }
        );

        if (!notifResponse.ok) {
          const errorData = await notifResponse.text();
          console.error(
            "Failed to send WhatsApp notification to notification group:",
            notifResponse.status,
            errorData
          );
        }
      }
    } catch (error) {
      console.error(
        "Error sending WhatsApp notification to notification group:",
        error.message || error
      );
    }

    return updatedRequest;
  } catch (error) {
    console.error("Error in processOrderByKitchen:", error);
    throw error;
  }
};
