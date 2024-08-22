"use strict";
// // import HotelSchema from "../models/Hotel.js";
// // import Room from "../models/Room.js";
// // export const createHotel = async (req, res, next) => {
// //     const newHotel = new HotelSchema(req.body);
// //     try {
// //         const savedHotel = await newHotel.save();
// //         res.status(200).json(savedHotel);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const updateHotel = async (req, res, next) => {
// //     try {
// //         const updatedHotel = await HotelSchema.findByIdAndUpdate(
// //             req.params.id,
// //             { $set: req.body },
// //             { new: true }
// //         );
// //         res.status(200).json(updatedHotel);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const deleteHotel = async (req, res, next) => {
// //     try {
// //         await HotelSchema.findByIdAndDelete(req.params.id);
// //         res.status(200).json("Hotel has been deleted.");
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const getHotel = async (req, res, next) => {
// //     try {
// //         const hotel = await HotelSchema.findById(req.params.id);
// //         res.status(200).json(hotel);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const getHotels = async (req, res, next) => {
// //     const { min, max, ...others } = req.query;
// //     try {
// //         const hotels = await HotelSchema.find({
// //             ...others,
// //             cheapestPrice: { $gt: min | 1, $lt: max || 999 },
// //         }).limit(req.query.limit);
// //         res.status(200).json(hotels);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const countByCity = async (req, res, next) => {
// //     const cities = req.query.cities.split(",");
// //     try {
// //         const list = await Promise.all(
// //             cities.map((city) => {
// //                 return HotelSchema.countDocuments({ city: city });
// //             })
// //         );
// //         res.status(200).json(list);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const countByType = async (req, res, next) => {
// //     try {
// //         const hotelCount = await HotelSchema.countDocuments({ type: "hotel" });
// //         const apartmentCount = await HotelSchema.countDocuments({ type: "apartment" });
// //         const resortCount = await HotelSchema.countDocuments({ type: "resort" });
// //         const villaCount = await HotelSchema.countDocuments({ type: "villa" });
// //         const cabinCount = await HotelSchema.countDocuments({ type: "cabin" });
// //         res.status(200).json([
// //             { type: "hotel", count: hotelCount },
// //             { type: "apartments", count: apartmentCount },
// //             { type: "resorts", count: resortCount },
// //             { type: "villas", count: villaCount },
// //             { type: "cabins", count: cabinCount },
// //         ]);
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// // export const getHotelRooms = async (req, res, next) => {
// //     try {
// //         const hotel = await HotelSchema.findById(req.params.id);
// //         const list = await Promise.all(
// //             hotel.rooms.map((room) => {
// //                 return Room.findById(room);
// //             })
// //         );
// //         res.status(200).json(list)
// //     } catch (err) {
// //         next(err);
// //     }
// // };
// import { Request, Response } from "express";
// import Hotel from "../models/hotel.model";
// // Create a new hotel
// export const createHotel = async (req: Request, res: Response) => {
//   try {
//     const newHotel = new Hotel(req.body);
//     const savedHotel = await newHotel.save();
//     res.status(201).json(savedHotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Get all hotels
// export const getHotels = async (req: Request, res: Response) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Get a hotel by ID
// export const getHotelById = async (req: Request, res: Response) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Update a hotel
// export const updateHotel = async (req: Request, res: Response) => {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedHotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     res.status(200).json(updatedHotel);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Delete a hotel
// export const deleteHotel = async (req: Request, res: Response) => {
//   try {
//     const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
//     if (!deletedHotel) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }
//     res.status(200).json({ message: "Hotel deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Get hotels by city (with optional filters)
// export const getHotelsByCity = async (req: Request, res: Response) => {
//   const city = req.query.city as string;
//   const minPrice = Number(req.query.minPrice) || 0;
//   const maxPrice = Number(req.query.maxPrice) || 10000;
//   try {
//     const hotels = await Hotel.find({
//       city: city,
//       cheapestPrice: { $gte: minPrice, $lte: maxPrice },
//     });
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
