import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import menuRoutes from "./menu.routes.js";
import employeeRoutes from "./employee.routes.js";
import serviceRequestRoutes from "./serviceRequest.routes.js";
import approvalRoutes from "./approval.routes.js";
import groupsNotifRoutes from "./groupsNotif.routes.js";
import kitchenRoutes from "./kitchen.routes.js";
import secretaryRoutes from "./secretary.routes.js";
import pushTokenRoutes from "./pushToken.routes.js";
import notificationRoutes from "./notification.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/menu", menuRoutes);
router.use("/employees", employeeRoutes);
router.use("/service-requests", serviceRequestRoutes);
router.use("/requests/approval", approvalRoutes);
router.use("/requests/monitoring", serviceRequestRoutes);
router.use("/notif/groups", groupsNotifRoutes);
router.use("/kitchen", kitchenRoutes);
router.use("/secretary", secretaryRoutes);
router.use("/push-tokens", pushTokenRoutes);
router.use("/notifications", notificationRoutes);

export default router;
