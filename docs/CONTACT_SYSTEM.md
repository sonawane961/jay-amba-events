# Contact System Documentation

## Overview

The contact system provides a comprehensive solution for handling customer inquiries through a web form, storing them in MongoDB, and providing admin management capabilities.

## Features

### 🎯 **User Features**

- **Contact Form**: Clean, responsive form with validation
- **Real-time Validation**: Instant feedback on form errors
- **Success/Error Messages**: Clear communication of submission status
- **Character Counter**: Message length tracking
- **Responsive Design**: Works on all device sizes

### 🔧 **Admin Features**

- **View Submissions**: Paginated list of all contact requests
- **Status Management**: Track new, read, replied, and archived contacts
- **Priority Levels**: Mark contacts as low, medium, high, or urgent
- **Category Organization**: Organize by inquiry type
- **Admin Notes**: Add internal notes for team reference
- **Search & Filter**: Find specific contacts quickly
- **Bulk Operations**: Archive or delete multiple contacts

### 🗄️ **Database Features**

- **MongoDB Storage**: Scalable document-based storage
- **Indexed Queries**: Fast search and retrieval
- **Data Validation**: Server-side validation rules
- **Audit Trail**: Track all changes and timestamps

## File Structure

```
├── pages/
│   ├── contact.js                 # Contact page component
│   └── api/
│       ├── contact.js             # Contact form submission API
│       └── admin/
│           └── contacts.js        # Admin management API
├── styles/
│   └── Contact.module.scss        # Contact page styles
├── utils/
│   └── contactSchema.js           # Database schema and helpers
└── docs/
    └── CONTACT_SYSTEM.md          # This documentation
```

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Admin Authentication
ADMIN_TOKEN=your_secure_admin_token_here
```

### 2. Database Setup

The system will automatically create the `contacts` collection when the first contact is submitted.

### 3. MongoDB Indexes

For optimal performance, create these indexes in your MongoDB database:

```javascript
// Connect to your MongoDB database and run:
db.contacts.createIndex({ email: 1 }, { background: true });
db.contacts.createIndex({ status: 1 }, { background: true });
db.contacts.createIndex({ createdAt: -1 }, { background: true });
db.contacts.createIndex({ category: 1 }, { background: true });
db.contacts.createIndex({ priority: 1 }, { background: true });
```

## API Endpoints

### 1. Submit Contact Form

**POST** `/api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Wedding Inquiry",
  "message": "I need information about wedding decoration packages."
}
```

**Response:**

```json
{
  "message": "Contact message sent successfully",
  "id": "507f1f77bcf86cd799439011",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Admin - Get Contacts

**GET** `/api/admin/contacts?page=1&limit=20&status=new&category=booking`

**Headers:**

```
Authorization: Bearer your_admin_token
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (new, read, replied, archived)
- `category`: Filter by category (general, pricing, booking, support, etc.)
- `priority`: Filter by priority (low, medium, high, urgent)
- `search`: Search in name, email, subject, or message
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort direction (asc/desc, default: desc)

**Response:**

```json
{
  "contacts": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 100,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 20
  }
}
```

### 3. Admin - Update Contact

**PUT** `/api/admin/contacts?id=contact_id`

**Headers:**

```
Authorization: Bearer your_admin_token
```

**Request Body:**

```json
{
  "status": "replied",
  "adminNotes": "Customer called and confirmed details",
  "priority": "high",
  "respondedBy": "admin_user"
}
```

### 4. Admin - Delete/Archive Contact

**DELETE** `/api/admin/contacts?id=contact_id`

**Headers:**

```
Authorization: Bearer your_admin_token
```

**Request Body:**

```json
{
  "action": "archive" // or "delete"
}
```

## Database Schema

### Contact Document Structure

```javascript
{
  _id: ObjectId,
  name: String,           // Required, 2-100 chars
  email: String,          // Required, valid email format
  phone: String,          // Required, 10-20 chars
  subject: String,        // Required, 3-200 chars
  message: String,        // Required, 10-2000 chars
  status: String,         // new, read, replied, archived
  createdAt: Date,        // Auto-generated
  updatedAt: Date,        // Auto-updated
  ipAddress: String,      // Optional, for tracking
  userAgent: String,      // Optional, browser info
  adminNotes: String,     // Optional, internal notes
  respondedAt: Date,      // Optional, when responded
  respondedBy: String,    // Optional, who responded
  priority: String,       // low, medium, high, urgent
  category: String        // general, pricing, booking, support, etc.
}
```

## Form Validation Rules

### Client-Side Validation

- **Name**: Required, letters and spaces only
- **Email**: Required, valid email format
- **Phone**: Required, 10+ digits with optional formatting
- **Subject**: Required, 3-200 characters
- **Message**: Required, 10-2000 characters

### Server-Side Validation

- All client-side rules plus additional security checks
- Input sanitization and trimming
- Rate limiting (can be implemented)
- Spam protection (can be implemented)

## Styling and UI

### Design Features

- **Modern Card Layout**: Clean, professional appearance
- **Gradient Backgrounds**: Subtle visual appeal
- **Hover Effects**: Interactive feedback
- **Responsive Grid**: Adapts to all screen sizes
- **Form States**: Visual feedback for validation and submission
- **Loading States**: Spinner and disabled states during submission

### Color Scheme

- **Primary**: #2a5962 (Dark Teal)
- **Accent**: #ff99cc (Pink)
- **Background**: #f4f7fa (Light Gray)
- **Success**: #28a745 (Green)
- **Error**: #dc3545 (Red)
- **Warning**: #ffc107 (Yellow)

## Security Features

### Input Validation

- Server-side validation for all fields
- SQL injection prevention (MongoDB)
- XSS protection through proper escaping
- Rate limiting ready (can be implemented)

### Authentication

- Admin token-based authentication
- Secure headers for admin endpoints
- Environment variable protection

## Performance Optimizations

### Database

- Indexed queries for fast retrieval
- Pagination to limit result sets
- Efficient filtering and sorting

### Frontend

- Debounced form validation
- Optimized re-renders
- Lazy loading ready

## Future Enhancements

### Planned Features

- **Email Notifications**: Auto-responders and admin alerts
- **File Attachments**: Allow customers to upload images/documents
- **Chat Integration**: Real-time chat support
- **Analytics Dashboard**: Contact form performance metrics
- **Multi-language Support**: Internationalization
- **Spam Protection**: CAPTCHA and bot detection
- **CRM Integration**: Connect with external CRM systems

### Technical Improvements

- **JWT Authentication**: Replace simple token auth
- **Redis Caching**: Cache frequently accessed data
- **WebSocket Support**: Real-time updates
- **API Rate Limiting**: Prevent abuse
- **Logging System**: Comprehensive audit trail

## Troubleshooting

### Common Issues

1. **Form Not Submitting**

   - Check browser console for errors
   - Verify API endpoint is accessible
   - Check MongoDB connection

2. **Validation Errors**

   - Ensure all required fields are filled
   - Check email format
   - Verify phone number length

3. **Admin Access Issues**

   - Verify ADMIN_TOKEN environment variable
   - Check Authorization header format
   - Ensure token matches exactly

4. **Database Connection**
   - Verify MONGODB_URI environment variable
   - Check network connectivity
   - Verify database permissions

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages in API responses.

## Support

For technical support or questions about the contact system:

- Check the browser console for client-side errors
- Review server logs for API errors
- Verify environment variables are set correctly
- Test MongoDB connection independently

## License

This contact system is part of the events-app project and follows the same licensing terms.
