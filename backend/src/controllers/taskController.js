import Task from "../models/Task.js";

export const createTaskController = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      deadline,
      createdBy: req.user._id, // logged-in user
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};
