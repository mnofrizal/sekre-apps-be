import express from "express";
import { auth } from "../middleware/auth.js";
import { checkRole } from "../middleware/checkRole.js";
import * as serviceRequestController from "../controllers/serviceRequest.controller.js";

const router = express.Router();

// Apply authentication and role check middleware to all routes
router.use(auth);
router.use(checkRole("SECRETARY"));

// A. Statistics & Reports
/**
 * @route   GET /api/v1/secretary/orders/stats/status
 * @desc    Get counts for each status
 * @access  Private
 */
router.get("/orders/stats/status", serviceRequestController.getStatusStats);

/**
 * @route   GET /api/v1/secretary/orders/stats/type
 * @desc    Get counts by order type
 * @access  Private
 */
router.get("/orders/stats/type", serviceRequestController.getTypeStats);

/**
 * @route   GET /api/v1/secretary/orders/export
 * @desc    Export orders to Excel
 * @access  Private
 */
router.get(
  "/orders/export",
  serviceRequestController.exportServiceRequestsToExcel
);

// B. Quick Access
/**
 * @route   GET /api/v1/secretary/orders/recent-active
 * @desc    Get 5 most recent active orders
 * @access  Private
 */
router.get(
  "/orders/recent-active",
  serviceRequestController.getRecentActiveOrders
);

/**
 * @route   GET /api/v1/secretary/orders/recent-activities
 * @desc    Get 7 latest order activities/status changes
 * @access  Private
 */
router.get(
  "/orders/recent-activities",
  serviceRequestController.getRecentActivities
);

// C. Basic CRUD
/**
 * @route   GET /api/v1/secretary/orders
 * @desc    Get all orders with filters and pagination
 * @access  Private
 */
router.get("/orders", serviceRequestController.getAllServiceRequests);

/**
 * @route   POST /api/v1/secretary/orders
 * @desc    Create new order
 * @access  Private
 */
router.post("/orders", serviceRequestController.createServiceRequest);

/**
 * @route   GET /api/v1/secretary/orders/:id
 * @desc    Get single order details
 * @access  Private
 */
router.get("/orders/:id", serviceRequestController.getServiceRequestById);

/**
 * @route   PUT /api/v1/secretary/orders/:id
 * @desc    Update order details
 * @access  Private
 */
router.put("/orders/:id", serviceRequestController.updateServiceRequest);

/**
 * @route   DELETE /api/v1/secretary/orders/:id
 * @desc    Cancel order
 * @access  Private
 */
router.delete("/orders/:id", serviceRequestController.deleteServiceRequest);

export default router;
