import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export function verifyToken(req, res, next) {
  // Get token from header, the client should be responsible for sending the token
  const token =
    req.header("Authorization").split(" ")[1] ||
    req.header("authorization").split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "mySecret"); // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
