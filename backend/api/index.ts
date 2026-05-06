import app, { seedDatabase } from "../src/index";
import { connectDB } from "../src/config/db";

let isSeeded = false;

export default async function handler(req: any, res: any) {
  try {
    await connectDB();

    if (!isSeeded) {
      await seedDatabase();
      isSeeded = true;
    }
  } catch (error) {
    console.error("Serverless startup error:", error);
  }

  return app(req, res);
}
