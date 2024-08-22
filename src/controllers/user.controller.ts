import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { createError } from "../utils/error";

// Update user profile
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      next(createError(500, error.message));
    } else {
      next(createError(500, "An unexpected error occurred"));
    }
  }
};

// Get user profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      next(createError(500, error.message));
    } else {
      next(createError(500, "An unexpected error occurred"));
    }
  }
};

// Delete a user (only admins or the user can do this)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      next(createError(500, error.message));
    } else {
      next(createError(500, "An unexpected error occurred"));
    }
  }
};
