import express, { Request, Response, Router } from "express";
import Taxi from "../models/Taxi";
import { protect } from "../middleware/auth";

const router: Router = express.Router();

// @route   GET /api/taxis
// @desc    Get all taxis
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  try {
    const taxis = await Taxi.find().sort({ createdAt: -1 });
    console.log("DB NAME:", Taxi.db.name);
    console.log("FETCHED TAXIS FROM DB:", taxis.length);
    res.json(taxis);
  } catch (error: any) {
    console.error("Error fetching taxis:", error);
    res.status(500).json({ message: "Server error fetching taxis" });
  }
});

// @route   POST /api/taxis
// @desc    Create a new taxi
// @access  Protected Admin Only
router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, seater, description, price, imageUrl, features, isPopular } = req.body;

    if (!name || !seater || !description || !price || !imageUrl) {
      res.status(400).json({ message: "Please provide name, seater, description, price and imageUrl" });
      return;
    }

    const newTaxi = await Taxi.create({
      name,
      seater,
      description,
      price,
      imageUrl,
      features: features || [],
      isPopular: !!isPopular,
    });

    res.status(201).json(newTaxi);
  } catch (error: any) {
    console.error("Error creating taxi:", error);
    res.status(500).json({ message: "Server error creating taxi" });
  }
});

// @route   PUT /api/taxis/:id
// @desc    Update a taxi
// @access  Protected Admin Only
router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, seater, description, price, imageUrl, features, isPopular } = req.body;

    const taxi = await Taxi.findById(req.params.id);
    if (!taxi) {
      res.status(404).json({ message: "Taxi not found" });
      return;
    }

    taxi.name = name || taxi.name;
    taxi.seater = seater || taxi.seater;
    taxi.description = description || taxi.description;
    taxi.price = price || taxi.price;
    taxi.imageUrl = imageUrl || taxi.imageUrl;
    taxi.features = features !== undefined ? features : taxi.features;
    taxi.isPopular = isPopular !== undefined ? !!isPopular : taxi.isPopular;

    const updatedTaxi = await taxi.save();
    res.json(updatedTaxi);
  } catch (error: any) {
    console.error("Error updating taxi:", error);
    res.status(500).json({ message: "Server error updating taxi" });
  }
});

// @route   DELETE /api/taxis/:id
// @desc    Delete a taxi
// @access  Protected Admin Only
router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const taxi = await Taxi.findById(req.params.id);
    if (!taxi) {
      res.status(404).json({ message: "Taxi not found" });
      return;
    }

    await taxi.deleteOne();
    res.json({ message: "Taxi deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting taxi:", error);
    res.status(500).json({ message: "Server error deleting taxi" });
  }
});

export default router;
