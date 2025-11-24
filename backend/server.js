import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/database.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./src/routes/authRoutes.js";

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Management System API Running" });
});

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
});
