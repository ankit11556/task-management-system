import User from "../models/User.js";
import { setTokenCookie } from "../utils/cookie.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

//Register Controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Login Controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("User not found. Please register first.", 404));
    }

    // Compare passwords using model method
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    setTokenCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
