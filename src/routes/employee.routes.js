import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { employeeValidation } from "../validations/employee.validation.js";
import * as employeeController from "../controllers/employee.controller.js";

const router = express.Router();

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

export default router;
