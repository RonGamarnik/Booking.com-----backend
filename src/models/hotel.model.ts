import mongoose, { Schema, Document, Types } from "mongoose";

// Interface to define the structure of the Hotel document
interface IFacility {
  category: string;
  name: string;
}

interface IReview {
  category: string;
  rating: number;
}

interface IAvailableRoom {
  roomId: string;
  quantity: number;
}

export interface IHotel extends Document {
  name: string;
  city: string;
  scoreNumber: number;
  scoreLetter: string;
  reviewsCount: number;
  price: string;
  description: string;
  image: string;
  distance: string;
  freeCancellation: boolean;
  prepayment: boolean;
  facilities: IFacility[];
  guestReviews: IReview[];
  availableRoom: Record<string, number>;
}

const FacilitySchema: Schema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
});

const ReviewSchema: Schema = new Schema({
  category: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
});

const HotelSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  scoreNumber: { type: Number, required: true, min: 0, max: 10 },
  scoreLetter: { type: String, required: true },
  reviewsCount: { type: Number, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  distance: { type: String, required: true },
  freeCancellation: { type: Boolean, required: true },
  prepayment: { type: Boolean, required: true },
  facilities: { type: [FacilitySchema], required: true },
  guestReviews: { type: [ReviewSchema], required: true },
  availableRoom: { type: Map, of: Number, required: true }, // A map for room availability
});

// Export the model with the IHotel interface
export default mongoose.model<IHotel>("Hotel", HotelSchema);
