import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { pushTokenValidation } from "../validations/pushToken.validation.js";
import * as pushTokenController from "../controllers/pushToken.controller.js";

const router = express.Router();

// Protect all routes with authentication
router.use(auth);

// List push tokens (admin only)
router.get("/", pushTokenController.getAllPushTokens);

// Get specific push token
router.get("/:id", pushTokenController.getPushTokenById);

// Get user's push tokens
router.get("/user/:userId", pushTokenController.getPushTokensByUserId);

// Create push token for current user
router.post(
  "/",
  validateRequest(pushTokenValidation.createPushToken),
  pushTokenController.createPushToken
);

// Update push token
router.put(
  "/:id",
  validateRequest(pushTokenValidation.updatePushToken),
  pushTokenController.updatePushToken
);

// Delete push token by ID
router.delete("/id/:id", pushTokenController.deletePushToken);

// Delete push token by token value
router.delete("/token/:token", pushTokenController.deletePushTokenByValue);

// Delete all push tokens for a user
router.delete("/user/:userId", pushTokenController.deleteUserPushTokens);

export default router;
