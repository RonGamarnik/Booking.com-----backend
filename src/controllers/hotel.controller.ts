import { Request, Response, NextFunction } from "express";
import Hotel from "../models/hotel.model";
import { createError } from "../utils/error";

// Get a single hotel by ID
export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return next(createError(404, "Hotel not found"));
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// Get all hotels
export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update room availability for a specific room type
export const updateRoomAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hotelId, roomType, availability } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return next(createError(404, "Hotel not found"));

    const room = hotel.roomAvailability.find((r) => r.roomType === roomType);
    if (!room) return next(createError(404, "Room type not found"));

    // Update the availability for the given date range
    room.availability = availability;

    const updatedHotel = await hotel.save();
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
