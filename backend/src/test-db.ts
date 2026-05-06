import dotenv from "dotenv";
import mongoose from "mongoose";
import Package from "./models/Package";

dotenv.config();

const testDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skd_tours_travels";
    await mongoose.connect(mongoUri);
    console.log("Reading DB packages...");

    const packages = await Package.find();
    console.log(`Found ${packages.length} packages:`);
    console.log(JSON.stringify(packages, null, 2));

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error reading DB:", error);
    process.exit(1);
  }
};

testDB();
