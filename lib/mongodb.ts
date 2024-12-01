import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default connectToDatabase;
