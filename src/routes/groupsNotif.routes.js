import express from "express";
import { auth } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import * as groupController from "../controllers/group.controller.js";

const router = express.Router();

// Protect all group routes with authentication
router.use(auth);

router.get("/", groupController.getAllGroups);
router.get("/:type", groupController.getGroupByType);
router.post("/", groupController.createGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

export default router;
