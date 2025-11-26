import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";
import redisClient from "../utils/redisClient.js";

//Helper function to clear cache
const clearTaskCache = async (userId) => {
  await redisClient.del("tasks:all"); //Admin cache
  await redisClient.del(`tasks:user:${userId}`); //User-specific cache
};

//Create Task
export const createTaskController = async (req, res, next) => {
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

    // Clear cache
    await clearTaskCache(req.user._id);

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
export const getTaskController = async (req, res, next) => {
  try {
    const cacheKey =
      req.user.role === "admin" ? "tasks:all" : `tasks:user:${req.user._id}`;

    // Clear cache
    const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
      return res.status(200).json({
        success: true,
        source: "cache",
        count: JSON.parse(cachedTasks).length,
        tasks: JSON.parse(cachedTasks),
      });
    }

    let tasks;

    // If admin => get all tasks
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email role");
    } else {
      // If user => only his tasks
      tasks = await Task.find({ createdBy: req.user._id });
    }

    // Save to cache for 60 seconds
    await redisClient.setEx(cacheKey, 60, JSON.stringify(tasks));

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
      source: "db", // indicate fetched from database
    });
  } catch (error) {
    next(error); // send to global handler
  }
};

// Update Task
export const updateTaskController = async (req, res, next) => {
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

    // Clear cache
    await clearTaskCache(req.user._id);

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
export const deleteTaskController = async (req, res, next) => {
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

    // Clear cache
    await clearTaskCache(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask: task,
    });
  } catch (error) {
    next(error);
  }
};
