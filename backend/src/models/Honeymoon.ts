import { Schema, model } from "mongoose";

const honeymoonSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    subtitle: { type: String }, // Maps to destination
    price: { type: String },
    duration: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Honeymoon = model("Honeymoon", honeymoonSchema);
export default Honeymoon;
