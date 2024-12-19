import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { employeeValidation } from "../validations/employee.validation.js";
import * as employeeController from "../controllers/employee.controller.js";

const router = express.Router();

// Multer configuration for Excel files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `employee-import-${uniqueSuffix}${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Protect all employee routes with authentication
router.use(auth);

// Get all unique subBidang values
router.get("/sub-bidang", employeeController.getAllSubBidang);

// Regular CRUD routes
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post(
  "/",
  validateRequest(employeeValidation.createEmployee),
  employeeController.createEmployee
);
router.put(
  "/:id",
  validateRequest(employeeValidation.updateEmployee),
  employeeController.updateEmployee
);
router.delete("/:id", employeeController.deleteEmployee);

// Excel import route
router.post(
  "/import",
  upload.single("file"),
  employeeController.importEmployees
);

export default router;
