import clientPromise from "../../utils/mongodb"; // Import the MongoDB connection utility

async function handler(req, res) {
  if (req.method === "DELETE") {
    // Delete image by _id
    try {
      const client = await clientPromise;
      const db = client.db("cloudinary_uploads");
      const imagesCollection = db.collection("images");
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: "Missing image id" });
      }
      const { ObjectId } = require("mongodb");
      const result = await imagesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Image deleted" });
      } else {
        return res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
  try {
    // Wait for the MongoDB client to connect
    const client = await clientPromise;

    // Specify the correct database
    const db = client.db("cloudinary_uploads"); // Use your actual database name

    // Access the "images" collection
    const imagesCollection = db.collection("images");

    // Fetch the images from MongoDB
    const images = await imagesCollection.find().toArray();

    // Send the image URLs as a response
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

export default handler;
