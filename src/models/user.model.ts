import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: string;
  nationality?: string;
  address?: string;
  passportDetails?: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  displayName: { type: String },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  nationality: { type: String },
  address: { type: String },
  passportDetails: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
