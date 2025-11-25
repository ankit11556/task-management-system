import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    "string.base": "Title must be text",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 3 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("", null),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  status: Joi.string()
    .valid("todo", "in-progress", "completed")
    .default("todo"),
  deadline: Joi.date().optional(),
});
