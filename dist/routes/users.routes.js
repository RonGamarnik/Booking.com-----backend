"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Update user profile (only the user themselves can do this)
router.put("/update-profile/:id", auth_middleware_1.verifyUser, user_controller_1.updateUserProfile);
// Get user profile (only the user themselves can access this)
router.get("/profile/:id", auth_middleware_1.verifyUser, user_controller_1.getUserProfile);
// Delete a user (only the user themselves or an admin can do this)
router.delete("/:id", auth_middleware_1.verifyUser, user_controller_1.deleteUser);
exports.default = router;
