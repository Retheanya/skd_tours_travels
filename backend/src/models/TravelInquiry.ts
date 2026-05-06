import { Schema, model } from "mongoose";

const travelInquirySchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    pickupDate: { type: String }, // Specifically for car bookings
    carType: { type: String },    // Name of the car selected
    message: { type: String, required: true },
    type: { type: String, enum: ["general", "car_booking"], default: "general" },
    price: { type: String },
    status: { type: String, default: "pending" }, // e.g., pending, viewed, resolved
  },
  { timestamps: true }
);

export const TravelInquiry = model("TravelInquiry", travelInquirySchema);
export default TravelInquiry;
