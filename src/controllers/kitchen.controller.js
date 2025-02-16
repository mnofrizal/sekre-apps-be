import * as kitchenService from "../services/kitchen.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Get all kitchen orders
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await kitchenService.getAllOrders();
    res.json(ApiResponse.success("Orders retrieved successfully", orders));
  } catch (error) {
    next(error);
  }
};

/**
 * Get order statistics by status
 */
export const getOrderStats = async (req, res, next) => {
  try {
    const stats = await kitchenService.getOrderStats();
    res.json(
      ApiResponse.success("Order statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await kitchenService.getOrderById(req.params.id);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    res.json(ApiResponse.success("Order retrieved successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Start working on order
 */
export const startOrder = async (req, res, next) => {
  try {
    const order = await kitchenService.startOrder(req.params.id, req.user.id);
    res.json(ApiResponse.success("Order started successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Complete order
 */
export const completeOrder = async (req, res, next) => {
  try {
    const evidencePath = req.file ? req.file.path : null;
    const order = await kitchenService.completeOrder(
      req.params.id,
      req.user.id,
      evidencePath
    );
    res.json(ApiResponse.success("Order completed successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await kitchenService.updateOrderStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );
    res.json(ApiResponse.success("Order status updated successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending orders
 */
export const getPendingOrders = async (req, res, next) => {
  try {
    const orders = await kitchenService.getPendingOrders();
    res.json(
      ApiResponse.success("Pending orders retrieved successfully", orders)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get in-progress orders
 */
export const getInProgressOrders = async (req, res, next) => {
  try {
    const orders = await kitchenService.getInProgressOrders();
    res.json(
      ApiResponse.success("In-progress orders retrieved successfully", orders)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get completed orders
 */
export const getCompletedOrders = async (req, res, next) => {
  try {
    const orders = await kitchenService.getCompletedOrders();
    res.json(
      ApiResponse.success("Completed orders retrieved successfully", orders)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get daily statistics
 */
export const getDailyStats = async (req, res, next) => {
  try {
    const stats = await kitchenService.getDailyStats();
    res.json(
      ApiResponse.success("Daily statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get top ordered items
 */
export const getTopOrderedItems = async (req, res, next) => {
  try {
    const items = await kitchenService.getTopOrderedItems();
    res.json(
      ApiResponse.success("Top ordered items retrieved successfully", items)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get pending orders count
 */
export const getPendingOrdersCount = async (req, res, next) => {
  try {
    const count = await kitchenService.getPendingOrdersCount();
    res.json(
      ApiResponse.success("Pending orders count retrieved successfully", {
        count,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get in-progress orders count
 */
export const getInProgressOrdersCount = async (req, res, next) => {
  try {
    const count = await kitchenService.getInProgressOrdersCount();
    res.json(
      ApiResponse.success("In-progress orders count retrieved successfully", {
        count,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get completed orders count
 */
export const getCompletedOrdersCount = async (req, res, next) => {
  try {
    const count = await kitchenService.getCompletedOrdersCount();
    res.json(
      ApiResponse.success("Completed orders count retrieved successfully", {
        count,
      })
    );
  } catch (error) {
    next(error);
  }
};
