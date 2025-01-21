import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { approvalValidation } from "../validations/approval.validation.js";
import * as approvalController from "../controllers/approval.controller.js";

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `approval-image-${uniqueSuffix}${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Public routes (for magic links)
router.get("/verify/:token", approvalController.verifyApprovalToken);
router.post(
  "/respond/:token",
  upload.single("image"),
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

// Process order by kitchen
router.post("/kitchen/:requestId", approvalController.processOrderByKitchen);

export default router;
