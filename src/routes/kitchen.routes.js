import express from "express";
import { auth } from "../middleware/auth.js";
import * as kitchenController from "../controllers/kitchen.controller.js";

const router = express.Router();

// Protect all kitchen routes with authentication
router.use(auth);

// Core Order Management
/**
 * @route   GET /api/v1/kitchen/orders
 * @desc    Get all kitchen orders
 * @access  Private
 */
router.get("/orders", kitchenController.getAllOrders);

/**
 * @route   GET /api/v1/kitchen/orders/stats
 * @desc    Get order statistics by status
 * @access  Private
 */
router.get("/orders/stats", kitchenController.getOrderStats);

// Kitchen Operations
/**
 * @route   GET /api/v1/kitchen/orders/pending
 * @desc    Get new incoming orders that haven't been started
 * @access  Private
 */
router.get("/orders/pending", kitchenController.getPendingOrders);

/**
 * @route   GET /api/v1/kitchen/orders/inprogress
 * @desc    Get all orders currently being prepared
 * @access  Private
 */
router.get("/orders/inprogress", kitchenController.getInProgressOrders);

/**
 * @route   GET /api/v1/kitchen/orders/completed
 * @desc    Get all completed orders (history)
 * @access  Private
 */
router.get("/orders/completed", kitchenController.getCompletedOrders);

/**
 * @route   GET /api/v1/kitchen/orders/:id
 * @desc    Get detailed information for a specific order
 * @access  Private
 */
router.get("/orders/:id", kitchenController.getOrderById);

/**
 * @route   POST /api/v1/kitchen/orders/:id/progress
 * @desc    Start working on an order - changes status to in-progress
 * @access  Private
 */
router.post("/orders/:id/progress", kitchenController.startOrder);

/**
 * @route   POST /api/v1/kitchen/orders/:id/complete
 * @desc    Mark an order as completed
 * @access  Private
 */
router.post("/orders/:id/complete", kitchenController.completeOrder);

/**
 * @route   PATCH /api/v1/kitchen/orders/:id/status
 * @desc    Update the status of an order
 * @access  Private
 */
router.patch("/orders/:id/status", kitchenController.updateOrderStatus);

// Reporting
/**
 * @route   GET /api/v1/kitchen/orders/stats/daily
 * @desc    Get today's order statistics
 * @access  Private
 */
router.get("/orders/stats/daily", kitchenController.getDailyStats);

/**
 * @route   GET /api/v1/kitchen/orders/stats/items
 * @desc    Get top 5 most ordered items for today
 * @access  Private
 */
router.get("/orders/stats/items", kitchenController.getTopOrderedItems);

/**
 * @route   GET /api/v1/kitchen/orders/count/pending
 * @desc    Get count of pending orders
 * @access  Private
 */
router.get("/orders/count/pending", kitchenController.getPendingOrdersCount);

/**
 * @route   GET /api/v1/kitchen/orders/count/inprogress
 * @desc    Get count of orders in progress
 * @access  Private
 */
router.get(
  "/orders/count/inprogress",
  kitchenController.getInProgressOrdersCount
);

/**
 * @route   GET /api/v1/kitchen/orders/count/completed
 * @desc    Get count of completed orders
 * @access  Private
 */
router.get(
  "/orders/count/completed",
  kitchenController.getCompletedOrdersCount
);

export default router;
