import express from "express";
const router = express.Router();

import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

router.get("/check-auth", protect, (req, res) => {
  res.json({ user: req.user });
});

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
