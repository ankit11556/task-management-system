import Task from "../models/Task.js";

//Create Task
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

//Get Task
export const getTaskController = async (req, res) => {
  try {
    let tasks;

    // If admin => get all tasks
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email role");
    } else {
      // If user => only his tasks
      tasks = await Task.find({ createdBy: req.user._id });
    }

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};
