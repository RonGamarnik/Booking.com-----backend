import express from "express";
import {
  updateUserProfile,
  getUserProfile,
  deleteUser,
} from "../controllers/user.controller";
import { verifyUser } from "../utils/verifyToken";

const router = express.Router();

// Update user profile (only the user themselves can do this)
router.put("/update-profile/:id", verifyUser, updateUserProfile);

// Get user profile (only the user themselves can access this)
router.get("/profile/:id", verifyUser, getUserProfile);

// Delete a user (only the user themselves or an admin can do this)
router.delete("/:id", verifyUser, deleteUser);

export default router;
