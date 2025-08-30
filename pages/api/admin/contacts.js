import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  // Basic admin authentication (you should implement proper JWT auth)
  const adminToken = req.headers.authorization?.replace("Bearer ", "");

  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    switch (method) {
      case "GET":
        // Get all contacts with pagination and filtering
        return await getContacts(req, res, db);

      case "PUT":
        // Update contact status or add admin notes
        return await updateContact(req, res, db);

      case "DELETE":
        // Archive or delete contact
        return await deleteContact(req, res, db);

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Admin Contacts API Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

// Get contacts with pagination and filtering
async function getContacts(req, res, db) {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      priority,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (priority && priority !== "all") {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination
    const totalCount = await db.collection("contacts").countDocuments(filter);

    // Get contacts with pagination
    const contacts = await db
      .collection("contacts")
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    return res.status(500).json({ message: "Error retrieving contacts" });
  }
}

// Update contact (status, admin notes, etc.)
async function updateContact(req, res, db) {
  try {
    const { id } = req.query;
    const { status, adminNotes, priority, category, respondedBy } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    if (priority) {
      updateData.priority = priority;
    }

    if (category) {
      updateData.category = category;
    }

    if (respondedBy) {
      updateData.respondedBy = respondedBy;
      updateData.respondedAt = new Date();
    }

    const result = await db
      .collection("contacts")
      .updateOne({ _id: id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({
      message: "Contact updated successfully",
      updatedFields: Object.keys(updateData),
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ message: "Error updating contact" });
  }
}

// Delete/Archive contact
async function deleteContact(req, res, db) {
  try {
    const { id } = req.query;
    const { action = "archive" } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    if (action === "archive") {
      // Archive the contact instead of deleting
      const result = await db.collection("contacts").updateOne(
        { _id: id },
        {
          $set: {
            status: "archived",
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({
        message: "Contact archived successfully",
      });
    } else if (action === "delete") {
      // Actually delete the contact (use with caution)
      const result = await db.collection("contacts").deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({
        message: "Contact deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "Invalid action. Use 'archive' or 'delete'",
      });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Error deleting contact" });
  }
}
