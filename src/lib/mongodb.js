import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL missing");
}

let isConnected = false;

async function dbConnect() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGODB_URL);
  isConnected = db.connections[0].readyState;
}

export default dbConnect;