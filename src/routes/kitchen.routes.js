import express from "express";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import * as kitchenController from "../controllers/kitchen.controller.js";

const router = express.Router();

// Protect all kitchen routes with authentication
router.use(auth);

// Core Order Management
/**
 * @route   GET /api/v1/kitchen/orders
 * @desc    Get all kitchen orders with pagination, sorting and filtering
 * @query   page - Page number (default: 1)
 * @query   limit - Items per page (default: 10)
 * @query   sort - Sort field and order (e.g. requestDate:desc, createdAt:asc)
 * @query   status - Filter by status (e.g. PENDING_KITCHEN, IN_PROGRESS)
 * @query   startDate - Filter by start date (YYYY-MM-DD)
 * @query   endDate - Filter by end date (YYYY-MM-DD)
 * @query   id - Search by order ID (case-insensitive partial match)
 * @query   judulPekerjaan - Search by judul pekerjaan (case-insensitive partial match)
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
 * @desc    Mark an order as completed with evidence image
 * @access  Private
 */
router.post(
  "/orders/:id/complete",
  upload.single("evidence"),
  kitchenController.completeOrder
);

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
