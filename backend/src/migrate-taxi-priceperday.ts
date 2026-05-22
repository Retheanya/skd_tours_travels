import dotenv from "dotenv";
import mongoose from "mongoose";
import Taxi from "./models/Taxi";

dotenv.config();

const pricePerDayDefaults: Record<string, string> = {
  dzire: "Rs. 1800",
  desire: "Rs. 1800",
  etios: "Rs. 2000",
  innova: "Rs. 3500",
};

const getDefaultPricePerDay = (name: string): string => {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(pricePerDayDefaults)) {
    if (lower.includes(key)) return val;
  }
  return "Rs. 2000"; // generic fallback
};

const migrate = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/skd_tours_travels";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for migration.");

    const taxis = await Taxi.find({});
    console.log(`Found ${taxis.length} taxi document(s).`);

    let updated = 0;
    for (const taxi of taxis) {
      if (!taxi.pricePerDay || taxi.pricePerDay.trim() === "") {
        taxi.pricePerDay = getDefaultPricePerDay(taxi.name);
        await taxi.save();
        console.log(`  ✓ Updated "${taxi.name}" → pricePerDay: ${taxi.pricePerDay}`);
        updated++;
      } else {
        console.log(`  – Skipped "${taxi.name}" (already has pricePerDay: ${taxi.pricePerDay})`);
      }
    }

    console.log(`\nMigration complete. ${updated} document(s) updated.`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
