import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { serviceRequestValidation } from "../validations/serviceRequest.validation.js";
import * as serviceRequestController from "../controllers/serviceRequest.controller.js";

const router = express.Router();

// Protect all routes with authentication
router.use(auth);

router.get("/", serviceRequestController.getAllServiceRequests);
router.get("/recent-active", serviceRequestController.getRecentActiveOrders);
router.get("/recent-activities", serviceRequestController.getRecentActivities);
router.get("/stats/status", serviceRequestController.getStatusStats);
router.get("/stats/type", serviceRequestController.getTypeStats);
router.get("/pending", serviceRequestController.getPendingServiceRequests);
router.get("/:id", serviceRequestController.getServiceRequestById);
router.get(
  "/data/export",
  serviceRequestController.exportServiceRequestsToExcel
);
router.post(
  "/",
  validateRequest(serviceRequestValidation.createServiceRequest),
  serviceRequestController.createServiceRequest
);
router.put(
  "/:id",
  validateRequest(serviceRequestValidation.updateServiceRequest),
  serviceRequestController.updateServiceRequest
);
router.delete("/:id", serviceRequestController.deleteServiceRequest);

// Status management
router.patch(
  "/:id/status",
  validateRequest(serviceRequestValidation.updateStatus),
  serviceRequestController.updateRequestStatus
);

// Complete request
router.put(
  "/:id/complete",

  serviceRequestController.completeRequest
);

export default router;
