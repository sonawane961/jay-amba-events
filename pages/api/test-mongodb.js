import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("Testing MongoDB connection...");

    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({
        error: "MONGODB_URI environment variable is not set",
        message: "Please add MONGODB_URI to your .env.local file",
      });
    }

    console.log("MONGODB_URI is set, attempting connection...");

    // Test the connection
    const { db } = await connectToDatabase();

    // Test a simple operation
    const result = await db.admin().ping();

    console.log("MongoDB connection successful:", result);

    return res.status(200).json({
      message: "MongoDB connection successful",
      ping: result,
      database: db.databaseName,
    });
  } catch (error) {
    console.error("MongoDB connection test failed:", error);

    return res.status(500).json({
      error: "MongoDB connection failed",
      message: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
