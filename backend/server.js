import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Management System API Running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`server is running at http://localhost:${PORT}`);
});
