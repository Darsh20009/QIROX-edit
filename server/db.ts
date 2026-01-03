import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI not set, using in-memory storage");
}

export async function connectDB() {
  if (!MONGODB_URI) {
    console.log("Skipping MongoDB connection - no URI provided");
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}

export function isConnected() {
  return mongoose.connection.readyState === 1;
}
