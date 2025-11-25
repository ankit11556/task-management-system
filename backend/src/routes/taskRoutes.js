import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  createTaskController,
  getTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRole("user", "admin"),
  createTaskController
);

router.get("/", protect, authorizeRole("user", "admin"), getTaskController);

export default router;
