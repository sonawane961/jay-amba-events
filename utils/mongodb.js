import { MongoClient } from "mongodb";

// MongoDB connection string (replace with your own)
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to the .env.local file");
}

const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
