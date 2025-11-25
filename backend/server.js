import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/database.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorMiddleware.js";
dotenv.config();

const app = express();

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import morgan from "morgan";

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // allow frontend origin later restrict
app.use(mongoSanitize());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Management System API Running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
});
