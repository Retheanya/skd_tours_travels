import { Router, Request, Response } from "express";
import TravelInquiry from "../models/TravelInquiry";
import { protect } from "../middleware/auth";
import { sendInquiryEmail } from "../lib/mailer";

const router = Router();

// @route   POST /api/travel-inquiries
// @desc    Submit a travel or taxi inquiry
// @access  Public
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, mobile, email, destination, message, pickupDate, carType, type, price } = req.body;

    if (!name || !mobile || !email || !destination || !message) {
      res.status(400).json({ message: "Please fill in all required fields" });
      return;
    }

    const newInquiry = await TravelInquiry.create({
      name,
      mobile,
      email,
      destination,
      message,
      pickupDate,
      carType,
      type,
      price
    });

    // Real Email dispatching to skttravels22@gmail.com
    await sendInquiryEmail({
      type: type || "car_booking",
      name,
      email,
      mobile,
      destination,
      message,
      price,
      carType,
      pickupDate
    });

    res.status(201).json(newInquiry);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/travel-inquiries
// @desc    Get all travel inquiries
// @access  Protected Admin Only
router.get("/", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await TravelInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
