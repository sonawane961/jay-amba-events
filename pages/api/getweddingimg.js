import clientPromise from "../../utils/mongodb"; // Import the MongoDB connection utility

async function handler(req, res) {
  try {
    // Wait for the MongoDB client to connect
    const client = await clientPromise;
    const db = client.db(); // Get the default database
    const imagesCollection = db.collection("images"); // Access the "images" collection

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
