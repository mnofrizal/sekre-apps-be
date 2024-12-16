import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { authValidation } from "../validations/auth.validation.js";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.login),
  authController.login
);
router.post(
  "/register",
  validateRequest(authValidation.register),
  authController.register
);

export default router;
