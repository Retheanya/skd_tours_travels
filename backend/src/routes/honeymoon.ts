import { Router, Request, Response } from "express";
import Honeymoon from "../models/Honeymoon";
import { protect } from "../middleware/auth";

const router = Router();

// @route   GET /api/honeymoons
// @desc    Get all honeymoon packages
// @access  Public
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const honeymoons = await Honeymoon.find().sort({ createdAt: -1 });
    res.json(honeymoons);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/honeymoons/:slug
// @desc    Get honeymoon package by slug
// @access  Public
router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const honeymoon = await Honeymoon.findOne({ slug: req.params.slug });
    if (!honeymoon) {
      res.status(404).json({ message: "Honeymoon package not found" });
      return;
    }
    res.json(honeymoon);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/honeymoons
// @desc    Create a new honeymoon package
// @access  Protected Admin Only
router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, name, description, imageUrl, subtitle, price, duration, images } = req.body;

    if (!slug || !name || !description || !imageUrl) {
      res.status(400).json({ message: "Please provide slug, name, description and imageUrl" });
      return;
    }

    const existingHoneymoon = await Honeymoon.findOne({ slug });
    if (existingHoneymoon) {
      res.status(400).json({ message: "A honeymoon package with this slug already exists" });
      return;
    }

    const newHoneymoon = await Honeymoon.create({
      slug,
      name,
      description,
      imageUrl,
      subtitle,
      price,
      duration,
      images: images || [],
    });

    res.status(201).json(newHoneymoon);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/honeymoons/:id
// @desc    Update a honeymoon package
// @access  Protected Admin Only
router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, name, description, imageUrl, subtitle, price, duration, images } = req.body;

    const honeymoon = await Honeymoon.findById(req.params.id);
    if (!honeymoon) {
      res.status(404).json({ message: "Honeymoon package not found" });
      return;
    }

    if (slug && slug !== honeymoon.slug) {
      const existingHoneymoon = await Honeymoon.findOne({ slug });
      if (existingHoneymoon) {
        res.status(400).json({ message: "A honeymoon package with this slug already exists" });
        return;
      }
    }

    honeymoon.slug = slug || honeymoon.slug;
    honeymoon.name = name || honeymoon.name;
    honeymoon.description = description || honeymoon.description;
    honeymoon.imageUrl = imageUrl || honeymoon.imageUrl;
    honeymoon.subtitle = subtitle || honeymoon.subtitle;
    honeymoon.price = price !== undefined ? price : honeymoon.price;
    honeymoon.duration = duration || honeymoon.duration;
    honeymoon.images = images !== undefined ? images : honeymoon.images;

    const updatedHoneymoon = await honeymoon.save();
    res.json(updatedHoneymoon);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/honeymoons/:id
// @desc    Delete a honeymoon package
// @access  Protected Admin Only
router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const honeymoon = await Honeymoon.findById(req.params.id);
    if (!honeymoon) {
      res.status(404).json({ message: "Honeymoon package not found" });
      return;
    }

    await honeymoon.deleteOne();
    res.json({ message: "Honeymoon package deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
