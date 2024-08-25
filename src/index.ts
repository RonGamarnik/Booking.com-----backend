import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes";
import usersRoute from "./routes/users.routes";
import {createConnection} from 'mysql2'
// import hotelsRoute from "./routes/hotels.routes";
// import roomsRoute from "./routes/rooms.routes";
import cors from "cors";
import { createError } from "./utils/error"; // Assuming this exists in utils folder
dotenv.config();
const SQLPORT = process.env.SQLPORT || 20285
const app = express();
const PORT = process.env.PORT || 3000;
const connection = createConnection({
  host:process.env.AIVAN_HOST ,
  user: 'avnadmin',
  password:process.env.AIVAN_PASSWORD ,
  database: 'defaultdb',
  connectTimeout: 30000, 
  port: 20285,
  ssl: {
    rejectUnauthorized: true,
    ca:process.env.CA_Certificate
}
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err);
  } else {
    console.log('Successfully connected to the MySQL database');
  }
  connection.end(); // Close the connection after testing
});
app.listen(SQLPORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
// app.use("/api/rooms", roomsRoute);

// Centralized Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start the server
 app.listen(PORT, () => {
   connect();
   console.log(`Server running on port ${PORT}`);
 });
