import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { getFileUrl } from "../utils/helpers.js";

/**
 * Transform orders to include full URLs for evidence
 */
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
 * Get orders with filters and pagination
 */
export const getOrders = async ({
  startDate,
  endDate,
  status,
  type,
  employeeId,
  page = 1,
  limit = 10,
  user,
}) => {
  const where = {
    AND: [
      // Filter by handlerId for non-admin users
      user.role !== "ADMIN" ? { handlerId: user.id } : {},
      startDate && endDate
        ? {
            requestDate: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : {},
      status ? { status } : {},
      type ? { type } : {},
      employeeId
        ? {
            employeeOrders: {
              some: {
                id: employeeId,
              },
            },
          }
        : {},
    ],
  };

  const [total, orders] = await Promise.all([
    prisma.serviceRequest.count({ where }),
    prisma.serviceRequest.findMany({
      where,
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
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    orders: transformOrders(orders),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId, user) => {
  const order = await prisma.serviceRequest.findUnique({
    where: { id: orderId },
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

  // Check if user has permission to access this order
  if (user.role !== "ADMIN" && order.handlerId !== user.id) {
    throw new ApiError(403, "You don't have permission to access this order");
  }

  return transformOrder(order);
};

/**
 * Create new order
 */
export const createOrder = async (orderData, userId) => {
  const order = await prisma.$transaction(async (prisma) => {
    const order = await prisma.serviceRequest.create({
      data: {
        ...orderData,
        handlerId: userId,
        statusHistory: {
          create: {
            status: orderData.status || "PENDING_SUPERVISOR",
            changedBy: userId,
            notes: "Order created",
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

    return order;
  });

  return transformOrder(order);
};

/**
 * Update order details
 */
export const updateOrder = async (orderId, updateData, userId) => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const updatedOrder = await prisma.$transaction(async (prisma) => {
    const updated = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        ...updateData,
        statusHistory: {
          create: {
            status: updateData.status || order.status,
            changedBy: userId,
            notes: "Order details updated",
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

    return updated;
  });

  return transformOrder(updatedOrder);
};

/**
 * Cancel order
 */
export const cancelOrder = async (orderId, userId) => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const cancelledOrder = await prisma.$transaction(async (prisma) => {
    const cancelled = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        statusHistory: {
          create: {
            status: "CANCELLED",
            changedBy: userId,
            notes: "Order cancelled",
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

    return cancelled;
  });

  return transformOrder(cancelledOrder);
};

/**
 * Get 5 most recent active orders
 */
export const getRecentActiveOrders = async (user) => {
  const orders = await prisma.serviceRequest.findMany({
    where: {
      AND: [
        {
          status: {
            notIn: ["COMPLETED", "CANCELLED"],
          },
        },
        // Filter by handlerId for non-admin users
        user.role !== "ADMIN" ? { handlerId: user.id } : {},
      ],
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
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  return transformOrders(orders);
};

/**
 * Get 7 latest order activities/status changes
 */
export const getRecentActivities = async () => {
  return await prisma.statusHistory.findMany({
    include: {
      request: {
        select: {
          id: true,
          type: true,
          judulPekerjaan: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
};

/**
 * Get counts for each status
 */
export const getStatusStats = async (user) => {
  const stats = await prisma.serviceRequest.groupBy({
    by: ["status"],
    where: user.role !== "ADMIN" ? { handlerId: user.id } : {},
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
 * Get counts by order type
 */
export const getTypeStats = async (user) => {
  const stats = await prisma.serviceRequest.groupBy({
    by: ["type"],
    where: user.role !== "ADMIN" ? { handlerId: user.id } : {},
    _count: {
      id: true,
    },
  });

  return stats.reduce((acc, curr) => {
    acc[curr.type] = curr._count.id;
    return acc;
  }, {});
};
