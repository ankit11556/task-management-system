import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

//Create Task
export const createTaskController = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } = req.body;

    if (!title) {
      return next(new AppError("Title is required", 400));
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
    next(error); // send to global handler
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
    next(error); // send to global handler
  }
};

// Update Task
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params; //taksId from URL
    const updates = req.body;

    //find task
    const task = await Task.findById(id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to update this task", 403)
      );
    }

    Object.assign(task, updates);

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task update successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Task
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    // Permission check (only admin or owner can delete)
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return next(
        new AppError("You don't have permission to delete this task", 403)
      );
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask: task,
    });
  } catch (error) {
    next(error);
  }
};
