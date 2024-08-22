import express from "express";
import {
  checkEmail,
  login,
  register,
  getLoggedInUser,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware"; // Assuming you have an auth middleware
const router = express.Router();

// Check if email exists
router.post("/check-email", checkEmail);

// Login route
router.post("/login", login);

// Register route
router.post("/register", register);

router.get("/me", verifyToken, getLoggedInUser);
export default router;
