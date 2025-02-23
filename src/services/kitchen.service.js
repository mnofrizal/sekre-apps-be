import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { getFileUrl, generateToken } from "../utils/helpers.js";
import * as notificationService from "./notification.service.js";
import { APPROVAL_FLOW } from "../utils/constants.js";

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
    include: {
      approvalLinks: true,
    },
  });

  if (!request) {
    throw new ApiError(404, "Order not found");
  }

  if (request.status !== "PENDING_KITCHEN") {
    throw new ApiError(400, "Order is not in pending kitchen status");
  }

  // Check if KITCHEN_DELIVERY approval link already exists
  const existingLink = request.approvalLinks.find(
    (link) =>
      link.type === "KITCHEN_DELIVERY" &&
      !link.isUsed &&
      link.expiresAt > new Date()
  );

  if (existingLink) {
    throw new ApiError(
      409,
      "Active KITCHEN_DELIVERY approval link already exists"
    );
  }

  return await prisma.$transaction(async (prisma) => {
    // Mark any existing KITCHEN approval as used
    const kitchenApproval = request.approvalLinks.find(
      (link) =>
        link.type === "KITCHEN" && !link.isUsed && link.expiresAt > new Date()
    );

    if (kitchenApproval) {
      await prisma.approvalLink.update({
        where: { token: kitchenApproval.token },
        data: {
          isUsed: true,
          response: true,
          responseNote: "Kitchen started working on order",
          respondedAt: new Date(),
        },
      });
    }

    // Create KITCHEN_DELIVERY approval link
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await prisma.approvalLink.create({
      data: {
        token: generateToken(),
        type: "KITCHEN_DELIVERY",
        requestId: orderId,
        expiresAt,
      },
    });

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
        body: `Pesanan #${orderId} sekarang sedang diproses`,
        data: {
          type: "order_update",
          orderId: orderId,
          status: "IN_PROGRESS",
        },
      });

      // Notify request handler
      await notificationService.sendNotificationToUsers(
        [updatedRequest.handler.id],
        {
          title: "Order Update",
          body: `Pesanan Anda #${orderId} sekarang sedang diproses oleh dapur`,
          data: {
            type: "order_update",
            orderId: orderId,
            status: "IN_PROGRESS",
          },
        }
      );
    } catch (error) {
      console.error("Error sending push notifications:", error);
      // Don't throw error since notification failure shouldn't affect the order update
    }

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
    include: {
      approvalLinks: true,
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

  // Find active KITCHEN_DELIVERY approval link
  const approvalLink = request.approvalLinks.find(
    (link) =>
      link.type === "KITCHEN_DELIVERY" &&
      !link.isUsed &&
      link.expiresAt > new Date()
  );

  if (!approvalLink) {
    throw new ApiError(400, "No active KITCHEN_DELIVERY approval link found");
  }

  const flow = APPROVAL_FLOW[approvalLink.type];

  return await prisma.$transaction(async (prisma) => {
    // Mark approval link as used
    await prisma.approvalLink.update({
      where: { token: approvalLink.token },
      data: {
        isUsed: true,
        response: true, // Always true since this is completion
        responseNote: "Order completed by kitchen",
        respondedAt: new Date(),
        image: evidencePath,
      },
    });

    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: orderId },
      data: {
        status: flow.nextStatus, // Will be COMPLETED based on APPROVAL_FLOW
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
        title: "Pesanan Selesai",
        body: `Pesanan #${orderId} telah diselesaikan oleh dapur`,
        data: {
          type: "order_completed",
          orderId: orderId,
          status: "COMPLETED",
        },
      });

      // Notify request handler
      await notificationService.sendNotificationToUsers(
        [updatedRequest.handler.id],
        {
          title: "Pesanan Selesai",
          body: `Pesanan Anda #${orderId} telah dikirimkan oleh dapur`,
          data: {
            type: "order_completed",
            orderId: orderId,
            status: "COMPLETED",
          },
        }
      );
    } catch (error) {
      console.error("Error sending push notifications:", error);
      // Don't throw error since notification failure shouldn't affect the order update
    }

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
        body: `Order #${orderId} status changed to ${status}`,
        data: {
          type: "order_update",
          orderId: orderId,
          status: status,
        },
      });

      // For specific status changes, notify the handler
      if (status === "REJECTED_KITCHEN" || status === "CANCELLED") {
        await notificationService.sendNotificationToUsers(
          [updatedRequest.handler.id],
          {
            title: "Order Update",
            body:
              status === "REJECTED_KITCHEN"
                ? `Your order #${orderId} has been rejected by kitchen`
                : `Your order #${orderId} has been cancelled`,
            data: {
              type: "order_update",
              orderId: orderId,
              status: status,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error sending push notifications:", error);
      // Don't throw error since notification failure shouldn't affect the status update
    }

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
