import dotenv from "dotenv";
import mongoose from "mongoose";
import Package from "./models/Package";
import { defaultPackages } from "./seed/packages";

dotenv.config();

const runSeed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skd_tours_travels";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for explicit seeding.");

    await Package.deleteMany({});
    await Package.insertMany(defaultPackages);
    console.log("Successfully seeded default travel packages via seed-run script.");
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding explicitly:", error);
    process.exit(1);
  }
};

runSeed();
