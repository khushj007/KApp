import mongoose from "mongoose";

export default async function connect() {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL!);
    if (response) {
      console.log(`mongodb connected`);
    }
  } catch (error: any) {
    console.log(`DATABASE CONNECTION ERROR`, error.message);
  }
}
