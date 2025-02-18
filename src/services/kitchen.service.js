import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { getFileUrl } from "../utils/helpers.js";

const transformOrder = (order) => {
  if (order.evidence) {
    order.evidence = getFileUrl(order.evidence);
  }
  return order;
};

const transformOrders = (orders) => {
  return orders.map(transformOrder);
};

/**
 * Get all kitchen orders
 */
export const getAllOrders = async () => {
  const orders = await prisma.serviceRequest.findMany({
    where: {
      type: "MEAL",
      status: {
        in: [
          "PENDING_KITCHEN",
          "REJECTED_KITCHEN",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED",
        ],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      employeeOrders: {
        select: {
          id: true,
          employeeName: true,
          entity: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              notes: true,
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return transformOrders(orders);
};

/**
 * Get order statistics by status
 */
export const getOrderStats = async () => {
  const stats = await prisma.serviceRequest.groupBy({
    where: {
      type: "MEAL",
      status: {
        in: [
          "PENDING_KITCHEN",
          "REJECTED_KITCHEN",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED",
        ],
      },
    },
    by: ["status"],
    _count: {
      id: true,
    },
  });

  return stats.reduce((acc, curr) => {
    acc[curr.status] = curr._count.id;
    return acc;
  }, {});
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId) => {
  const order = await prisma.serviceRequest.findUnique({
    where: {
      id: orderId,
      type: "MEAL",
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
      statusHistory: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return transformOrder(order);
};

/**
 * Start working on order
 */
export const startOrder = async (orderId, userId) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id: orderId,
      type: "MEAL",
    },
  });

  if (!request) {
    throw new ApiError(404, "Order not found");
  }

  if (request.status !== "PENDING_KITCHEN") {
    throw new ApiError(400, "Order is not in pending kitchen status");
  }

  return await prisma.$transaction(async (prisma) => {
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status: "IN_PROGRESS",
        statusHistory: {
          create: {
            status: "IN_PROGRESS",
            changedBy: userId,
            notes: "Kitchen started working on order",
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
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return transformOrder(updatedRequest);
  });
};

/**
 * Complete order
 */
export const completeOrder = async (orderId, userId, evidencePath = null) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id: orderId,
      type: "MEAL",
    },
  });

  if (!request) {
    throw new ApiError(404, "Order not found");
  }

  if (request.status !== "IN_PROGRESS") {
    throw new ApiError(400, "Order is not in progress");
  }

  if (!evidencePath) {
    throw new ApiError(400, "Evidence image is required to complete the order");
  }

  return await prisma.$transaction(async (prisma) => {
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED",
        evidence: evidencePath,
        statusHistory: {
          create: {
            status: "COMPLETED",
            changedBy: userId,
            notes: "Order completed by kitchen with evidence",
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
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return transformOrder(updatedRequest);
  });
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status, userId) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id: orderId,
      type: "MEAL",
    },
  });

  if (!request) {
    throw new ApiError(404, "Order not found");
  }

  const validStatuses = [
    "PENDING_KITCHEN",
    "REJECTED_KITCHEN",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status for kitchen order");
  }

  return await prisma.$transaction(async (prisma) => {
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status,
        statusHistory: {
          create: {
            status,
            changedBy: userId,
            notes: `Status updated to ${status}`,
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

/**
 * Get pending orders
 */
export const getPendingOrders = async () => {
  const orders = await prisma.serviceRequest.findMany({
    where: {
      type: "MEAL",
      status: "PENDING_KITCHEN",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      employeeOrders: {
        select: {
          id: true,
          employeeName: true,
          entity: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              notes: true,
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return transformOrders(orders);
};

/**
 * Get in-progress orders
 */
export const getInProgressOrders = async () => {
  const orders = await prisma.serviceRequest.findMany({
    where: {
      type: "MEAL",
      status: "IN_PROGRESS",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      employeeOrders: {
        select: {
          id: true,
          employeeName: true,
          entity: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              notes: true,
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return transformOrders(orders);
};

/**
 * Get completed orders
 */
export const getCompletedOrders = async () => {
  const orders = await prisma.serviceRequest.findMany({
    where: {
      type: "MEAL",
      status: "COMPLETED",
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      employeeOrders: {
        select: {
          id: true,
          employeeName: true,
          entity: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              notes: true,
              menuItem: {
                select: {
                  id: true,
                  name: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return transformOrders(orders);
};

/**
 * Get daily statistics
 */
export const getDailyStats = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = await prisma.serviceRequest.groupBy({
    by: ["status"],
    where: {
      type: "MEAL",
      createdAt: {
        gte: today,
      },
      status: {
        in: [
          "PENDING_KITCHEN",
          "REJECTED_KITCHEN",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED",
        ],
      },
    },
    _count: {
      id: true,
    },
  });

  return stats.reduce((acc, curr) => {
    acc[curr.status] = curr._count.id;
    return acc;
  }, {});
};

/**
 * Get top ordered items for today
 */
export const getTopOrderedItems = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = await prisma.orderItem.groupBy({
    by: ["menuItemId"],
    where: {
      employeeOrder: {
        request: {
          type: "MEAL",
          createdAt: {
            gte: today,
          },
        },
      },
    },
    _count: {
      menuItemId: true,
    },
    orderBy: {
      _count: {
        menuItemId: "desc",
      },
    },
    take: 5,
  });

  // Get menu items details for the top ordered items
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: items.map((item) => item.menuItemId),
      },
    },
  });

  return items.map((item) => {
    const menuItem = menuItems.find((mi) => mi.id === item.menuItemId);
    return {
      itemId: menuItem.id,
      name: menuItem.name,
      count: item._count.menuItemId,
    };
  });
};

/**
 * Get pending orders count
 */
export const getPendingOrdersCount = async () => {
  return await prisma.serviceRequest.count({
    where: {
      type: "MEAL",
      status: "PENDING_KITCHEN",
    },
  });
};

/**
 * Get in-progress orders count
 */
export const getInProgressOrdersCount = async () => {
  return await prisma.serviceRequest.count({
    where: {
      type: "MEAL",
      status: "IN_PROGRESS",
    },
  });
};

/**
 * Get completed orders count
 */
export const getCompletedOrdersCount = async () => {
  return await prisma.serviceRequest.count({
    where: {
      type: "MEAL",
      status: "COMPLETED",
    },
  });
};
