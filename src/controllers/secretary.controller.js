import * as secretaryService from "../services/secretary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Get orders with filters and pagination
 */
export const getOrders = async (req, res, next) => {
  try {
    const { startDate, endDate, status, type, employeeId, page, limit } =
      req.query;
    const orders = await secretaryService.getOrders({
      startDate,
      endDate,
      status,
      type,
      employeeId,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      user: req.user,
    });
    res.json(ApiResponse.success("Orders retrieved successfully", orders));
  } catch (error) {
    next(error);
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await secretaryService.getOrderById(req.params.id, req.user);
    res.json(ApiResponse.success("Order retrieved successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Create new order
 */
export const createOrder = async (req, res, next) => {
  try {
    const order = await secretaryService.createOrder(req.body, req.user.id);
    res
      .status(201)
      .json(ApiResponse.success("Order created successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Update order details
 */
export const updateOrder = async (req, res, next) => {
  try {
    const order = await secretaryService.updateOrder(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(ApiResponse.success("Order updated successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel order
 */
export const cancelOrder = async (req, res, next) => {
  try {
    const order = await secretaryService.cancelOrder(
      req.params.id,
      req.user.id
    );
    res.json(ApiResponse.success("Order cancelled successfully", order));
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent active orders
 */
export const getRecentActiveOrders = async (req, res, next) => {
  try {
    const orders = await secretaryService.getRecentActiveOrders(req.user);
    res.json(
      ApiResponse.success("Recent active orders retrieved successfully", orders)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent activities
 */
export const getRecentActivities = async (req, res, next) => {
  try {
    const activities = await secretaryService.getRecentActivities();
    res.json(
      ApiResponse.success(
        "Recent activities retrieved successfully",
        activities
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get status statistics
 */
export const getStatusStats = async (req, res, next) => {
  try {
    const stats = await secretaryService.getStatusStats(req.user);
    res.json(
      ApiResponse.success("Status statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get type statistics
 */
export const getTypeStats = async (req, res, next) => {
  try {
    const stats = await secretaryService.getTypeStats(req.user);
    res.json(
      ApiResponse.success("Type statistics retrieved successfully", stats)
    );
  } catch (error) {
    next(error);
  }
};
