import { MongoClient } from "mongodb";

// MongoDB connection string (replace with your own)
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to the .env.local file");
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default database or specify name like client.db("your-db-name")
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to database");
  }
}

export default clientPromise;
