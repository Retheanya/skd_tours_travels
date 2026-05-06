const defaultHoneymoonPackages = [
  {
    slug: "romantic-munnar-escape",
    name: "Romantic Munnar Escape",
    description: "Experience the magic of misty tea gardens and romantic weather with your loved one. A perfect peaceful retreat.",
    imageUrl: "/src/assets/munnar1.jpg",
    subtitle: "Munnar, Kerala",
    duration: "3 Days",
    price: "Rs. 9,999",
    images: ["/src/assets/munnar1.jpg", "/src/assets/munnar2.jpg", "/src/assets/munnar3.jpg", "/src/assets/munnar4.jpg"]
  },
  {
    slug: "alleppey-houseboat-honeymoon",
    name: "Alleppey Houseboat Honeymoon",
    description: "Sail through the tranquil backwaters in a premium private houseboat. Enjoy traditional Kerala cuisine and serene views.",
    imageUrl: "/src/assets/allapey1.jpg",
    subtitle: "Alleppey, Kerala",
    duration: "2 Days",
    price: "Rs. 12,500",
    images: ["/src/assets/allapey1.jpg", "/src/assets/allapey2.jpg", "/src/assets/allapey3.jpg", "/src/assets/allapey4.jpg"]
  },
  {
    slug: "coorg-natures-lap",
    name: "Coorg Nature's Lap",
    description: "Wake up to the aroma of coffee plantations and stunning valley views. Ideal for nature-loving couples.",
    imageUrl: "/src/assets/coorg1.jpg",
    subtitle: "Coorg, Karnataka",
    duration: "4 Days",
    price: "Rs. 14,999",
    images: ["/src/assets/coorg1.jpg", "/src/assets/coorg2.jpg", "/src/assets/coorg3.jpg", "/src/assets/coorg4.jpg"]
  },
  {
    slug: "ooty-queen-of-hills",
    name: "Ooty Queen of Hills",
    description: "A timeless honeymoon destination with botanical gardens, lakes, and heritage trains.",
    imageUrl: "/src/assets/ooty1.jpg",
    subtitle: "Ooty, Tamil Nadu",
    duration: "3 Days",
    price: "Rs. 11,500",
    images: ["/src/assets/ooty1.jpg", "/src/assets/ooty2.jpg", "/src/assets/oorty3.jpg", "/src/assets/ooty4.jpg"]
  },
  {
    slug: "goa-beach-vibes",
    name: "Goa Beach Vibes",
    description: "Sun, sand, sea, and sunsets. The perfect recipe for a romantic beach getaway with vibrant nightlife.",
    imageUrl: "/src/assets/goa1.jpg",
    subtitle: "Goa",
    duration: "5 Days",
    price: "Rs. 18,999",
    images: ["/src/assets/goa1.jpg", "/src/assets/goa2.jpg", "/src/assets/goa3.jpg"]
  },
  {
    slug: "french-riviera-of-the-east",
    name: "French Riviera of the East",
    description: "Stroll through colonial streets and pristine beaches with your partner in this quiet French town.",
    imageUrl: "/src/assets/pondi1.jpg",
    subtitle: "Pondicherry",
    duration: "3 Days",
    price: "Rs. 10,999",
    images: ["/src/assets/pondi1.jpg", "/src/assets/pondi2.jpg", "/src/assets/pondi3.jpg", "/src/assets/pondi4.jpg"]
  },
  {
    slug: "yercaud-peaceful-retreat",
    name: "Yercaud Peaceful Retreat",
    description: "A hidden gem offering serene lakes and quiet viewpoints, away from the bustling city life.",
    imageUrl: "/src/assets/yerkad1.jpg",
    subtitle: "Yercaud, Tamil Nadu",
    duration: "2 Days",
    price: "Rs. 8,999",
    images: ["/src/assets/yerkad1.jpg", "/src/assets/yerkad2.jpg", "/src/assets/yerkad3.jpg", "/src/assets/yerkad4.jpg"]
  },
  {
    slug: "chikmagalur-coffee-bliss",
    name: "Chikmagalur Coffee Bliss",
    description: "Luxurious stays amidst lush green coffee estates and waterfalls. Perfect for a cozy retreat.",
    imageUrl: "/src/assets/chikmangalor1.jpg",
    subtitle: "Chikmagalur, Karnataka",
    duration: "3 Days",
    price: "Rs. 12,999",
    images: ["/src/assets/chikmangalor1.jpg", "/src/assets/chikmangalor2.jpg", "/src/assets/chikmangalor3.jpg", "/src/assets/chikmangalor4.jpg"]
  },
  {
    slug: "wayanad-wild-romance",
    name: "Wayanad Wild Romance",
    description: "Treehouses, caves, and wildlife for the adventurous couple seeking an offbeat honeymoon.",
    imageUrl: "/src/assets/waynad1.jpg",
    subtitle: "Wayanad, Kerala",
    duration: "4 Days",
    price: "Rs. 13,500",
    images: ["/src/assets/waynad1.jpg", "/src/assets/waynad2.jpg", "/src/assets/waynad3.jpg", "/src/assets/waynad4.jpg"]
  },
  {
    slug: "kodaikanal-princess-of-hills",
    name: "Kodaikanal Princess of Hills",
    description: "Pine forests, star-shaped lake, and foggy mornings make it perfectly romantic for newlyweds.",
    imageUrl: "/src/assets/kodaikanal1.jpg",
    subtitle: "Kodaikanal, Tamil Nadu",
    duration: "3 Days",
    price: "Rs. 11,999",
    images: ["/src/assets/kodaikanal1.jpg", "/src/assets/kodaikanal2.jpg", "/src/assets/kodaikanal3.jpg", "/src/assets/kodaikanal4.jpg"]
  },
  {
    slug: "mangalore-coastal-delight",
    name: "Mangalore Coastal Delight",
    description: "Enjoy pristine beaches, ancient temples, and amazing seafood on your romantic getaway to Mangalore.",
    imageUrl: "/src/assets/mangalor1.jpg",
    subtitle: "Mangalore",
    duration: "3 Days",
    price: "Rs. 10,500",
    images: ["/src/assets/mangalor1.jpg", "/src/assets/mangalor2.jpg", "/src/assets/mangalor3.jpg", "/src/assets/mangalor4.jpg"]
  }
];

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import bcrypt from "bcryptjs";

// Load environment variables immediately
dotenv.config();

// Fix for 'querySrv' DNS errors on some Windows environments
if (process.platform === "win32") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import packageRoutes from "./routes/package";
import inquiryRoutes from "./routes/inquiry";
import travelInquiryRoutes from "./routes/travelInquiry";
import taxiRoutes from "./routes/taxi";
import honeymoonRoutes from "./routes/honeymoon";
import User from "./models/User";
import Package from "./models/Package";
import Taxi from "./models/Taxi";
import Honeymoon from "./models/Honeymoon";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/travel-inquiries", travelInquiryRoutes);
app.use("/api/taxis", taxiRoutes);
app.use("/api/honeymoons", honeymoonRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("SKD Tours and Travels API is running successfully.");
});

import { defaultPackages } from "./seed/packages";

// Seed Initial Data (Admin & Packages) if empty
const seedDatabase = async () => {
  try {
    // 1. Seed Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("adminpassword123!", salt);

      await User.create({
        name: "Admin User",
        email: "admin@skttravels.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Seeded default admin account: admin@skttravels.com / adminpassword123!");
    }

    // 2. Seed and Synchronize Default Travel Packages from seed file
    for (const pkg of defaultPackages) {
      const existing = await Package.findOne({ slug: pkg.slug });
      if (existing) {
        existing.subtitle = pkg.subtitle;
        await existing.save();
      } else {
        await Package.create(pkg);
      }
    }
    console.log("Successfully synchronized default travel packages.");

    // Seed Honeymoon Packages if none exist or contain old Unsplash URLs
    const oldUnsplashExists = await Honeymoon.findOne({ imageUrl: /unsplash\.com/ });
    if (oldUnsplashExists) {
      await Honeymoon.deleteMany({});
      console.log("Cleared old Unsplash honeymoon packages.");
    }

    const honeymoonCount = await Honeymoon.countDocuments();
    if (honeymoonCount === 0) {
      // Create clean seed objects for Honeymoon collection
      const seeds = defaultHoneymoonPackages.map(p => ({
        slug: p.slug,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        subtitle: p.subtitle,
        price: p.price,
        duration: p.duration,
        images: p.images
      }));
      await Honeymoon.insertMany(seeds);
      console.log("Successfully seeded default honeymoon packages in separate collection.");
    }

    // 3. Seed Default Taxis
    const taxiCount = await Taxi.countDocuments();
    if (taxiCount === 0) {
      await Taxi.create([
        {
          name: "Swift Dzire / Toyota Etios",
          seater: "4+1 Seater",
          description: "Perfect for small families or business trips within the city or outstation.",
          price: "Rs. 14 / km",
          imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
          features: ["A/C", "Music System", "Professional Driver", "Clean Interiors"],
          isPopular: true
        },
        {
          name: "Toyota Etios (Premium)",
          seater: "4+1 Seater",
          description: "Comfortable sedan with ample legroom and boot space for your luggage.",
          price: "Rs. 15 / km",
          imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600",
          features: ["A/C", "Ample Boot Space", "Well Maintained", "Safe Driving"],
          isPopular: false
        },
        {
          name: "Toyota Innova Crysta",
          seater: "7+1 Seater",
          description: "The ultimate choice for group travels, long journeys, and family outings.",
          price: "Rs. 22 / km",
          imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
          features: ["Dual A/C", "Luxury Seating", "Spacious", "Smooth Ride"],
          isPopular: true
        }
      ]);
      console.log("Successfully seeded default taxi vehicles.");
    }
  } catch (error) {
    console.error("Error seeding initial database:", error);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  }
};

startServer();

export default app;
