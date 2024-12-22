import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { WA_URL } from "../utils/constants.js";
import { generateToken } from "../utils/helpers.js";

export const getAllServiceRequests = async (user) => {
  // Base query with all includes
  const includeOptions = {
    handler: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
    employeeOrders: {
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    },
    statusHistory: {
      orderBy: {
        createdAt: "desc",
      },
    },
    approvalLinks: true,
  };

  // Base where clause
  let whereClause = {};

  // Filter based on user role
  if (user.role === "KITCHEN") {
    // Kitchen users only see requests with specific statuses
    whereClause.status = {
      in: [
        "PENDING_KITCHEN",
        "REJECTED_KITCHEN",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
    };
  } else if (user.role !== "ADMIN") {
    // Regular users only see their own requests
    whereClause.handlerId = user.id;
  }

  // Get requests with filters applied
  const requests = await prisma.serviceRequest.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: {
      createdAt: "desc",
    },
  });

  return requests;
};

export const getPendingServiceRequests = async (user) => {
  // Base query with all includes
  const includeOptions = {
    handler: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
    employeeOrders: {
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    },
    statusHistory: {
      orderBy: {
        createdAt: "desc",
      },
    },
    approvalLinks: true,
  };

  // Filter for pending requests with specific statuses
  let whereClause = {
    status: {
      in: ["PENDING_GA", "PENDING_SUPERVISOR"],
    },
  };

  // Filter based on user role
  if (user.role !== "ADMIN") {
    // Regular users only see their own pending requests
    whereClause.handlerId = user.id;
  }

  // Get pending requests with filters applied
  const pendingRequests = await prisma.serviceRequest.findMany({
    where: whereClause,
    include: includeOptions,
    orderBy: {
      createdAt: "desc",
    },
  });

  return pendingRequests;
};

export const getServiceRequestById = async (id) => {
  return prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      handler: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      employeeOrders: {
        include: {
          orderItems: {
            include: {
              menuItem: true,
            },
          },
        },
      },
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
      approvalLinks: true,
    },
  });
};

export const createServiceRequest = async (requestData, userId) => {
  const { employeeOrders, ...serviceRequestData } = requestData;

  const token = generateToken();

  return prisma.$transaction(async (prisma) => {
    // Create the service request with all related data
    const request = await prisma.serviceRequest.create({
      data: {
        ...serviceRequestData,
        id: token,
        type: "MEAL",
        status: "PENDING_SUPERVISOR",
        handlerId: userId,
        employeeOrders: {
          create: employeeOrders.map((order) => ({
            employeeName: order.employeeName,
            entity: order.entity,
            orderItems: {
              create: order.items.map((item) => ({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                notes: item.notes,
              })),
            },
          })),
        },
        statusHistory: {
          create: {
            status: "PENDING_SUPERVISOR",
            changedBy: userId,
            notes: "Request created",
          },
        },
        // Create the approval link within the same transaction
        approvalLinks: {
          create: {
            token: token,
            type: "SUPERVISOR",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            isUsed: false,
          },
        },
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
        statusHistory: true,
        approvalLinks: true,
      },
    });

    console.log({ request });

    // Fetch to send meal message
    const response = await fetch(`${WA_URL}/api/messages/send-meal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: request.id,
        phone: "6287733760363",
        judulPekerjaan: request.judulPekerjaan,
        subBidang: request.supervisor?.subBidang || "Kosong",
        requiredDate: request.requiredDate,
        requestDate: request.requestDate,
        dropPoint: request.dropPoint,
        totalEmployees: request.employeeOrders.length,
        approvalToken: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return request;
  });
};

export const updateServiceRequest = async (id, requestData) => {
  const { employeeOrders, ...serviceRequestData } = requestData;

  try {
    return await prisma.$transaction(async (prisma) => {
      // Update the main request
      const request = await prisma.serviceRequest.update({
        where: { id },
        data: serviceRequestData,
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

      // If employee orders are provided, update them
      if (employeeOrders) {
        // Delete existing orders and items
        await prisma.orderItem.deleteMany({
          where: {
            employeeOrder: {
              requestId: id,
            },
          },
        });
        await prisma.employeeOrder.deleteMany({
          where: {
            requestId: id,
          },
        });

        // Create new orders and items
        await Promise.all(
          employeeOrders.map((order) =>
            prisma.employeeOrder.create({
              data: {
                requestId: id,
                employeeName: order.employeeName,
                entity: order.entity,
                orderItems: {
                  create: order.items.map((item) => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                    notes: item.notes,
                  })),
                },
              },
            })
          )
        );
      }

      return request;
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export const deleteServiceRequest = async (id) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete related records first
      await prisma.orderItem.deleteMany({
        where: {
          employeeOrder: {
            requestId: id,
          },
        },
      });
      await prisma.employeeOrder.deleteMany({
        where: {
          requestId: id,
        },
      });
      await prisma.statusHistory.deleteMany({
        where: {
          requestId: id,
        },
      });
      await prisma.approvalLink.deleteMany({
        where: {
          requestId: id,
        },
      });
      // Finally delete the service request
      await prisma.serviceRequest.delete({
        where: { id },
      });
    });
    return true;
  } catch (error) {
    if (error.code === "P2025") {
      return false;
    }
    throw error;
  }
};

export const updateRequestStatus = async (id, newStatus, userId, notes) => {
  return prisma.$transaction(async (prisma) => {
    // Update the request status
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: newStatus,
        statusHistory: {
          create: {
            status: newStatus,
            changedBy: userId,
            notes: notes || `Status updated to ${newStatus}`,
          },
        },
      },
      include: {
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return updatedRequest;
  });
};
