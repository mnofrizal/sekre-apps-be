import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { approvalValidation } from "../validations/approval.validation.js";
import * as approvalController from "../controllers/approval.controller.js";

const router = express.Router();

// Public routes (for magic links)
router.get("/verify/:token", approvalController.verifyApprovalToken);
router.post(
  "/respond/:token",
  validateRequest(approvalValidation.respond),
  approvalController.respondToRequest
);

// Protected routes
router.use(auth);
router.post(
  "/:requestId",
  validateRequest(approvalValidation.create),
  approvalController.createApprovalLink
);
router.get("/:requestId", approvalController.getApprovalLink);
router.delete("/:requestId", approvalController.deleteApprovalLink);

export default router;
