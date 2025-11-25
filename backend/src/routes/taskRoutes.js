import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTaskController } from "../controllers/taskController.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRole("user", "admin"),
  createTaskController
);

export default router;
