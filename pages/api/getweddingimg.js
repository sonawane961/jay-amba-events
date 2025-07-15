import clientPromise from "../../utils/mongodb"; // Import the MongoDB connection utility

async function handler(req, res) {
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
