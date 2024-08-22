import mongoose, { Schema, Document } from "mongoose";

interface IFacility {
  category: string;
  name: string;
}

interface IGuestRating {
  category: string;
  rating: number;
}

interface IRoomAvailability {
  roomType: string; // Room type name (e.g., Standard, Deluxe)
  price: number;
  maxGuests: number;
  availability: {
    startDate: Date;
    endDate: Date;
    available: number;
  }[];
}

interface IHotel extends Document {
  name: string;
  city: string;
  scoreNumber: number;
  scoreLetter: string;
  reviewsCount: number;
  description: string;
  image: string;
  facilities: IFacility[];
  avgGuestRating: IGuestRating[];
  distance: string;
  freeCancellation: boolean;
  prepayment: boolean;
  roomAvailability: IRoomAvailability[];
}

const FacilitySchema = new Schema<IFacility>({
  category: { type: String, required: true },
  name: { type: String, required: true },
});

const GuestRatingSchema = new Schema<IGuestRating>({
  category: { type: String, required: true },
  rating: { type: Number, required: true },
});

const AvailabilitySchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  available: { type: Number, required: true },
});

const RoomAvailabilitySchema = new Schema<IRoomAvailability>({
  roomType: { type: String, required: true }, // e.g., "Standard", "Deluxe"
  price: { type: Number, required: true }, // Price per night
  maxGuests: { type: Number, required: true }, // Maximum guests allowed
  availability: [AvailabilitySchema],
});

const HotelSchema = new Schema<IHotel>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  scoreNumber: { type: Number, required: true },
  scoreLetter: { type: String, required: true },
  reviewsCount: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  facilities: { type: [FacilitySchema], required: true },
  avgGuestRating: { type: [GuestRatingSchema], required: true },
  distance: { type: String, required: true },
  freeCancellation: { type: Boolean, required: true },
  prepayment: { type: Boolean, required: true },
  roomAvailability: { type: [RoomAvailabilitySchema], required: true },
});

export default mongoose.model<IHotel>("Hotel", HotelSchema);
