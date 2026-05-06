import { Router, Request, Response } from "express";
import Package from "../models/Package";
import { protect } from "../middleware/auth";

const router = Router();

// @route   GET /api/packages
// @desc    Get all travel packages
// @access  Public
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const packages = await Package.find({ isHoneymoon: { $ne: true } }).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/packages/:slug
// @desc    Get package by slug
// @access  Public
router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) {
      res.status(404).json({ message: "Package not found" });
      return;
    }
    res.json(pkg);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/packages
// @desc    Create a new package
// @access  Protected Admin Only
router.post("/", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, name, description, imageUrl, subtitle, categories, price, images, isHoneymoon } = req.body;

    if (!slug || !name || !description || !imageUrl) {
      res.status(400).json({ message: "Please provide slug, name, description and imageUrl" });
      return;
    }

    const existingPackage = await Package.findOne({ slug });
    if (existingPackage) {
      res.status(400).json({ message: "A package with this slug already exists" });
      return;
    }

    const newPackage = await Package.create({
      slug,
      name,
      description,
      imageUrl,
      subtitle,
      categories,
      price,
      images: images || [],
      isHoneymoon: !!isHoneymoon,
    });

    res.status(201).json(newPackage);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/packages/:id
// @desc    Update a package
// @access  Protected Admin Only
router.put("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, name, description, imageUrl, subtitle, categories, price, images, isHoneymoon, duration } = req.body;

    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      res.status(404).json({ message: "Package not found" });
      return;
    }

    // Check slug uniqueness if it changes
    if (slug && slug !== pkg.slug) {
      const existingPackage = await Package.findOne({ slug });
      if (existingPackage) {
        res.status(400).json({ message: "A package with this slug already exists" });
        return;
      }
    }

    pkg.slug = slug || pkg.slug;
    pkg.name = name || pkg.name;
    pkg.description = description || pkg.description;
    pkg.imageUrl = imageUrl || pkg.imageUrl;
    pkg.subtitle = subtitle || pkg.subtitle;
    pkg.categories = categories || pkg.categories;
    (pkg as any).price = price !== undefined ? price : (pkg as any).price;
    pkg.images = images !== undefined ? images : pkg.images;
    if (isHoneymoon !== undefined) {
      (pkg as any).isHoneymoon = !!isHoneymoon;
    }

    const updatedPackage = await pkg.save();
    res.json(updatedPackage);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/packages/:id
// @desc    Delete a package
// @access  Protected Admin Only
router.delete("/:id", protect, async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      res.status(404).json({ message: "Package not found" });
      return;
    }

    await pkg.deleteOne();
    res.json({ message: "Package deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
