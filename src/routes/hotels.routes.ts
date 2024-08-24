import express from "express";
import {
  getHotelById,
  getHotels,
  updateRoomAvailability,
} from "../controllers/hotel.controller";

const router = express.Router();

router.get("/:id", getHotelById);
router.get("/", getHotels);
router.put("/availability", updateRoomAvailability); // Updating room availability

export default router;
