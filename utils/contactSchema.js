// MongoDB Schema for Contact Collection
// This file defines the structure and validation rules for contact form submissions

const contactSchema = {
  // Collection name
  collectionName: "contacts",

  // Document structure
  documentStructure: {
    // Basic contact information
    name: {
      type: "string",
      required: true,
      minLength: 2,
      maxLength: 100,
      description: "Full name of the person contacting",
    },

    email: {
      type: "string",
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 255,
      description: "Valid email address",
    },

    phone: {
      type: "string",
      required: true,
      minLength: 10,
      maxLength: 20,
      description: "Phone number with country code",
    },

    subject: {
      type: "string",
      required: true,
      minLength: 3,
      maxLength: 200,
      description: "Subject/topic of the inquiry",
    },

    message: {
      type: "string",
      required: true,
      minLength: 10,
      maxLength: 2000,
      description: "Detailed message content",
    },

    // Status tracking
    status: {
      type: "string",
      required: true,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
      description: "Current status of the contact request",
    },

    // Timestamps
    createdAt: {
      type: "date",
      required: true,
      default: "current_timestamp",
      description: "When the contact was created",
    },

    updatedAt: {
      type: "date",
      required: true,
      default: "current_timestamp",
      description: "When the contact was last updated",
    },

    // Optional fields for tracking
    ipAddress: {
      type: "string",
      required: false,
      maxLength: 45,
      description: "IP address of the submitter",
    },

    userAgent: {
      type: "string",
      required: false,
      maxLength: 500,
      description: "Browser/user agent information",
    },

    // Admin notes
    adminNotes: {
      type: "string",
      required: false,
      maxLength: 1000,
      description: "Internal notes for admin use",
    },

    // Response tracking
    respondedAt: {
      type: "date",
      required: false,
      description: "When admin responded to this contact",
    },

    respondedBy: {
      type: "string",
      required: false,
      maxLength: 100,
      description: "Name/ID of admin who responded",
    },

    // Priority level
    priority: {
      type: "string",
      required: false,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      description: "Priority level of the contact request",
    },

    // Category for organization
    category: {
      type: "string",
      required: false,
      enum: [
        "general",
        "pricing",
        "booking",
        "support",
        "complaint",
        "partnership",
        "other",
      ],
      default: "general",
      description: "Category of the inquiry",
    },
  },

  // Indexes for better performance
  indexes: [
    {
      fields: { email: 1 },
      options: { background: true },
    },
    {
      fields: { status: 1 },
      options: { background: true },
    },
    {
      fields: { createdAt: -1 },
      options: { background: true },
    },
    {
      fields: { category: 1 },
      options: { background: true },
    },
    {
      fields: { priority: 1 },
      options: { background: true },
    },
  ],

  // Validation rules
  validationRules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s]+$/,
    },

    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 255,
    },

    phone: {
      required: true,
      minLength: 10,
      maxLength: 20,
      pattern: /^[0-9+\-\s()]+$/,
    },

    subject: {
      required: true,
      minLength: 3,
      maxLength: 200,
    },

    message: {
      required: true,
      minLength: 10,
      maxLength: 2000,
    },
  },

  // Sample document
  sampleDocument: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    subject: "Wedding Decoration Inquiry",
    message:
      "Hi, I'm planning my wedding in December and would like to know about your decoration packages. Could you please share details about pricing and availability?",
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date(),
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    category: "booking",
    priority: "medium",
  },
};

// Helper functions for contact management
export const contactHelpers = {
  // Validate contact data
  validateContactData: (data) => {
    const errors = {};

    // Check required fields
    Object.keys(contactSchema.validationRules).forEach((field) => {
      const rule = contactSchema.validationRules[field];
      const value = data[field];

      if (rule.required && (!value || !value.trim())) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (value) {
        // Check min length
        if (rule.minLength && value.trim().length < rule.minLength) {
          errors[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } must be at least ${rule.minLength} characters long`;
        }

        // Check max length
        if (rule.maxLength && value.trim().length > rule.maxLength) {
          errors[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } must be no more than ${rule.maxLength} characters long`;
        }

        // Check pattern
        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = `Please enter a valid ${field}`;
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  // Sanitize contact data
  sanitizeContactData: (data) => {
    return {
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase(),
      phone: data.phone?.trim(),
      subject: data.subject?.trim(),
      message: data.message?.trim(),
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
      category: data.category || "general",
      priority: data.priority || "medium",
    };
  },

  // Get status display text
  getStatusDisplay: (status) => {
    const statusMap = {
      new: "New",
      read: "Read",
      replied: "Replied",
      archived: "Archived",
    };
    return statusMap[status] || status;
  },

  // Get priority display text
  getPriorityDisplay: (priority) => {
    const priorityMap = {
      low: "Low",
      medium: "Medium",
      high: "High",
      urgent: "Urgent",
    };
    return priorityMap[priority] || priority;
  },

  // Get category display text
  getCategoryDisplay: (category) => {
    const categoryMap = {
      general: "General",
      pricing: "Pricing",
      booking: "Booking",
      support: "Support",
      complaint: "Complaint",
      partnership: "Partnership",
      other: "Other",
    };
    return categoryMap[category] || category;
  },
};

export default contactSchema;
