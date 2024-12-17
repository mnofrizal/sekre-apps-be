import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllServiceRequests = async () => {
  return prisma.serviceRequest.findMany({
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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
    },
  });
};

export const createServiceRequest = async (requestData, userId) => {
  const { employeeOrders, ...serviceRequestData } = requestData;

  return prisma.$transaction(async (prisma) => {
    // Create the service request
    const request = await prisma.serviceRequest.create({
      data: {
        ...serviceRequestData,
        type: "MEAL",
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
            status: serviceRequestData.status || "PENDING_SUPERVISOR",
            changedBy: userId,
            notes: "Request created",
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
      },
    });

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
