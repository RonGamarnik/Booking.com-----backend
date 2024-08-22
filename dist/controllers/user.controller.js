"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserProfile = exports.updateUserProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_1 = require("../utils/error");
// Update user profile
const updateUserProfile = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedUser = await user_model_1.default.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updatedUser) {
            return next((0, error_1.createError)(404, "User not found"));
        }
        res
            .status(200)
            .json({ message: "Profile updated successfully", user: updatedUser });
    }
    catch (error) {
        if (error instanceof Error) {
            next((0, error_1.createError)(500, error.message));
        }
        else {
            next((0, error_1.createError)(500, "An unexpected error occurred"));
        }
    }
};
exports.updateUserProfile = updateUserProfile;
// Get user profile
const getUserProfile = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            return next((0, error_1.createError)(404, "User not found"));
        }
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            next((0, error_1.createError)(500, error.message));
        }
        else {
            next((0, error_1.createError)(500, "An unexpected error occurred"));
        }
    }
};
exports.getUserProfile = getUserProfile;
// Delete a user (only admins or the user can do this)
const deleteUser = async (req, res, next) => {
    try {
        await user_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            next((0, error_1.createError)(500, error.message));
        }
        else {
            next((0, error_1.createError)(500, "An unexpected error occurred"));
        }
    }
};
exports.deleteUser = deleteUser;
