import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("Contact form submission received:", req.body);

    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed - invalid email format");
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      console.log("Validation failed - invalid phone format");
      return res.status(400).json({
        message: "Invalid phone number format",
      });
    }

    // Validate message length
    if (message.trim().length < 10) {
      console.log("Validation failed - message too short");
      return res.status(400).json({
        message: "Message must be at least 10 characters long",
      });
    }

    console.log("Validation passed, connecting to database...");

    // Connect to database
    const { db } = await connectToDatabase();
    console.log("Database connected successfully");

    // Create contact document
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: "new", // new, read, replied, archived
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"],
    };

    console.log("Inserting contact data:", contactData);

    // Insert into database
    const result = await db.collection("contacts").insertOne(contactData);
    console.log("Contact inserted successfully:", result.insertedId);

    // Optional: Send email notification to admin
    // await sendAdminNotification(contactData);

    // Optional: Send confirmation email to user
    // await sendUserConfirmation(contactData);

    return res.status(201).json({
      message: "Contact message sent successfully",
      id: result.insertedId,
      timestamp: contactData.createdAt,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    // Check if it's a MongoDB connection error
    if (error.message.includes("Failed to connect to database")) {
      return res.status(500).json({
        message: "Database connection failed. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    // Check if it's an environment variable error
    if (error.message.includes("MONGODB_URI")) {
      return res.status(500).json({
        message: "Server configuration error. Please contact administrator.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
