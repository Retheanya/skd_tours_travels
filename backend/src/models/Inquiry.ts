import { Schema, model } from "mongoose";

const inquirySchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "pending" }, // e.g., pending, viewed, resolved
  },
  { timestamps: true }
);

export const Inquiry = model("Inquiry", inquirySchema);
export default Inquiry;
