import express from "express";
import { checkEmail, login, register } from "../controllers/auth.controller";

const router = express.Router();

// Check if email exists
router.post("/check-email", checkEmail);

// Login route
router.post("/login", login);

// Register route
router.post("/register", register);

export default router;
