"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware"); // Assuming you have an auth middleware
const router = express_1.default.Router();
// Check if email exists
router.post("/check-email", auth_controller_1.checkEmail);
// Login route
router.post("/login", auth_controller_1.login);
// Register route
router.post("/register", auth_controller_1.register);
router.get("/me", auth_middleware_1.verifyToken, auth_controller_1.getLoggedInUser);
exports.default = router;
