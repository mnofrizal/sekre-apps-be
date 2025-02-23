import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { notificationValidation } from "../validations/notification.validation.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = express.Router();

// Protect all routes with authentication
router.use(auth);

// Send notification to specific users by user IDs
router.post(
  "/send-to-users",
  validateRequest(notificationValidation.sendToUsers),
  notificationController.sendNotificationToUsers
);

// Send notification to specific tokens
router.post(
  "/send-to-tokens",
  validateRequest(notificationValidation.sendToTokens),
  notificationController.sendNotifications
);

// Send notification to users by role
router.post(
  "/send-to-role",
  validateRequest(notificationValidation.sendToRole),
  notificationController.sendNotificationToRole
);

// Handle invalid tokens
router.post(
  "/handle-invalid-tokens",
  notificationController.handleInvalidTokens
);

export default router;
