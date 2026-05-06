import { Router, Request, Response } from "express";
import Inquiry from "../models/Inquiry";
import { protect } from "../middleware/auth";
import { sendInquiryEmail } from "../lib/mailer";

const router = Router();

// @route   POST /api/inquiries
// @desc    Submit a customer inquiry/enquiry
// @access  Public
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, mobile, email, destination, message } = req.body;

    if (!name || !mobile || !email || !destination || !message) {
      res.status(400).json({ message: "Please fill in all required fields" });
      return;
    }

    const newInquiry = await Inquiry.create({
      name,
      mobile,
      email,
      destination,
      message,
    });

    // Real Email forwarding logic to skttravels22@gmail.com
    await sendInquiryEmail({
      type: "general",
      name,
      email,
      mobile,
      destination,
      message,
    });

    res.status(201).json(newInquiry);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Protected Admin Only
router.get("/", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PATCH /api/inquiries/:id
// @desc    Update inquiry status (e.g. pending, viewed, resolved)
// @access  Protected Admin Only
router.patch("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "viewed", "resolved"].includes(status)) {
      res.status(400).json({ message: "Invalid status value provided" });
      return;
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ message: "Inquiry not found" });
      return;
    }

    inquiry.status = status;
    const updatedInquiry = await inquiry.save();

    res.json(updatedInquiry);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Protected Admin Only
router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ message: "Inquiry not found" });
      return;
    }

    await inquiry.deleteOne();
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
