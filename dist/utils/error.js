"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, message) => {
    const err = new Error(message); // You can pass the message directly to the Error constructor
    err.status = status; // Add a custom status property to the error object
    return err;
};
exports.createError = createError;
