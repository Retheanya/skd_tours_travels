import mongoose, { Schema, Document } from "mongoose";

export interface ITaxi extends Document {
  name: string;
  seater: string;
  description: string;
  price: string;
  imageUrl: string;
  features: string[];
  isPopular?: boolean;
}

const TaxiSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    seater: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    features: { type: [String], default: [] },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ITaxi>("Taxi", TaxiSchema);
