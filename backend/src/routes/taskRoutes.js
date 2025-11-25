import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  createTaskController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController.js";
import { validate } from "../middleware/validationMiddleware.js";
import { createTaskSchema } from "../validations/taskValidation.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRole("user", "admin"),
  validate(createTaskSchema), // <-- added validation
  createTaskController
);

router.get("/", protect, authorizeRole("user", "admin"), getTaskController);

router.put(
  "/update/:id",
  protect,
  authorizeRole("user", "admin"),
  updateTaskController
);

router.delete(
  "/delete/:id",
  protect,
  authorizeRole("user", "admin"),
  deleteTaskController
);

export default router;
