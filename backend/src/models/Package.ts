import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  title: { type: String, required: true },
  items: [{ type: String }]
});

const packageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    subtitle: { type: String },
    price: { type: String },
    categories: [categorySchema],
    images: [{ type: String }],
    isHoneymoon: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Package = model("Package", packageSchema);
export default Package;
