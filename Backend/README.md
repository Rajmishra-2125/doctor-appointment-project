# Backend Documentation

## Project Name
Doctor Appointment Management System – Backend

---

## Introduction
This backend system is designed to support a doctor appointment web application.  
It provides secure authentication, doctor and patient management, appointment booking, session handling, and administrative controls.

The backend follows a **modular MVC architecture** and uses **MongoDB** for scalable data storage.

---

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (Access Token & Refresh Token)
- **Environment Variables:** dotenv
- **Task Scheduling:** Node cron jobs
- **Version Control:** Git & GitHub

---

## Project Structure
## Complete File Structure

```plaintext
Backend/
├── public/                # Static assets
├── src/
│   ├── app.js             # Express app setup (middleware, routes)
│   ├── index.js           # Entry point (DB connection, server start)
│   ├── constants.js       # App-wide constants (e.g., DB name)
│   ├── configs/           # Configuration files
│   ├── controllers/       # Business logic (Request/Response handlers)
│   │   ├── auth.controllers.js
│   │   ├── user.controllers.js
│   │   ├── doctor.controllers.js
│   │   ├── appointment.controllers.js
│   │   └── ...
│   ├── models/            # Mongoose Schemas (Data definition)
│   │   ├── user.models.js
│   │   ├── doctor.models.js
│   │   ├── appointment.models.js
│   │   └── ...
│   ├── routes/            # API Endpoints (Mapping to controllers)
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── ...
│   ├── middlewares/       # Interceptors (Auth, Error, Uploads)
│   │   ├── auth.middlewares.js
│   │   ├── error.middleware.js
│   │   └── multer.middlewares.js
│   ├── utils/             # Helper functions and classes
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
│   └── db/                # Database connection logic
│       └── index.js
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

### 2. Role of Each File Category

- **`src/index.js`**: The entry point. Connects to the database and starts the server.
- **`src/app.js`**: Configures the Express application (CORS, CookieParser, static files) and mounts all routers.
- **`src/controllers/*`**: Contains core business logic. Controllers interact with models and utility functions to handle requests and send responses.
- **`src/models/*`**: Defines the data structure (schema) for MongoDB. Includes methods for passwords, tokens, and data validation.
- **`src/routes/*`**: Defines API endpoints, maps them to controller functions, and applies middleware.
- **`src/utils/*`**:
    - `ApiError.js`: Standardizes error responses (status code, message).
    - `ApiResponse.js`: Standardizes success responses.
    - `asyncHandler.js`: Higher-order function to catch async errors automatically.
    - `cloudinary.js`: Handles file uploads to the Cloudinary service.

---


### 3. REST API Design
The API utilizes standard HTTP methods and resource-based URLs.

**Examples:**
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/current-user` - Get authenticated user details (Secured)
- `PATCH /api/v1/users/change-password` - Update password (Secured)
- `DELETE /api/v1/users/delete-account` - Soft delete account (Secured)

**Directives:**
- **Versioning**: All routes are prefixed with `/api/v1`.
- **Standard Responses**: All endpoints return JSON wrapped in the `ApiResponse` class.

---

### 4. MongoDB Schema Explanation
The database schema leverages Mongoose features for robustness and performance.

**User Schema (`user.models.js`)**
- **Validation**: Strict validation for email (Regex) and required fields.
- **Security**: Sensitive fields like `password` are excluded by default (`select: false`). Includes hooks for password hashing (`pre("save")`).
- **Methods**: Custom methods for password verification and token generation.
- **Soft Delete**: `isActive` and `accountStatus` fields manage logical deletion.

**Appointment Schema (`appointment.models.js`)**
- **Relationships**: Linking `User` (patientId) and `Doctor` (doctorId) via ObjectIds.
- **Indexing**: Compound indexes (e.g., `doctorId` + `date` + `timeSlots`) ensure efficiency and prevent double-booking.

---


### 5. JWT-Based Authentication Flow
A secure **Dual Token System** (Access + Refresh Tokens) is implemented.

1.  **Login/Register**:
    - Backend validates credentials.
    - Generates **Access Token** (short-lived) and **Refresh Token** (long-lived).
    - Tokens are sent as **HTTPOnly Secure Cookies** to prevent XSS attacks.

2.  **Accessing Protected Routes**:
    - `verifyJWT` middleware checks request cookies.
    - Decodes Access Token; if valid, attaches user to `req.user`.
    - If expired, returns 401 Unauthorized.

---


### 6. Middleware Usage
- **`errorHandler`**: Centralized error handling middleware at the end of `app.js`. Catches `ApiError` and formats consistent JSON responses.
- **`verifyJWT`**: Protects routes ensuring only authenticated users can access them.
- **`multer`**: Handles `multipart/form-data` for file uploads (e.g., avatars), storing temporarily before cloud upload.

---

### 7. Error Handling Approach
A robust, centralized strategy:

1.  **`asyncHandler` Wrapper**: Wraps all controller functions to eliminate repetitive try-catch blocks.
    ```javascript
    const loginUser = asyncHandler(async (req, res) => { ... })
    ```
2.  **`ApiError` Class**: Provides a consistent structure for throwing operational errors.
    ```javascript
    throw new ApiError(404, "User not found")
    ```
3.  **Global Error Middleware**: Catch-all function that ensures the client always receives a clean JSON error response.

---

### 8. Advantages for Real-World Applications
1.  **Scalability**: Modular architecture allows different teams to work on separate components without conflict.
2.  **Security**: Comprehensive security measures including HTTPOnly cookies, rate limiting, and password hashing.
3.  **Maintainability**: Standardized patterns for errors and responses simplify debugging and frontend integration.
4.  **Data Integrity**: Strong schema definitions and database-level constraints ensure data quality.


## Core Functionalities

### 1. Authentication System
- User signup and login
- JWT-based authentication
- Access token and refresh token mechanism
- Secure logout
- Session tracking for multi-device login

---


### 2. User Management
- User registration and profile management
- Soft delete account functionality
- Account recovery within a 30-day window
- Account status handling:
  - ACTIVE
  - DELETED
  - SUSPENDED
- Reason tracking for account deletion

---

### 3. Doctor Management
- Doctor profile creation and update
- Visibility control (show/hide doctor)
- Accepting or pausing patient appointments
- Availability management
- Admin moderation support

---

### 4. Appointment Management
- Slot-based appointment booking
- Prevention of double booking
- Appointment cancellation
- Automatic status updates
- Support for rescheduling

---

### 5. Session Management
- Dedicated session model
- Token expiration handling
- Secure refresh token storage
- Auto-expiry using TTL index
- Logout from all devices support

---

## Database Design Highlights

- Indexed fields for faster queries
- Compound and partial indexes
- Soft delete pattern for critical data
- MongoDB transactions using Mongoose sessions
- Aggregation pipelines for analytics and reporting

---

## Soft Delete & Account Recovery

The system uses a **soft delete strategy** instead of permanent deletion.

### How it works:
- User account is marked inactive
- Deletion is scheduled for 30 days
- User can recover account before execution date
- Background job permanently deletes expired accounts

This approach improves data safety and user experience.

---

## Background Jobs

Located in:

### Purpose:
- Automatically delete expired accounts
- Clean up related data
- Maintain database hygiene

Jobs run at scheduled intervals using cron logic.

---

## Migration Scripts

Located in:


### Example Migration:
- Add soft delete fields to existing users
- Add visibility flags to doctors

### Run Migration:
```bash
node src/migrations/001_addSoftDeleteFields.js

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

## Api Response Structure 

# Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

# Error Response

{
  "success": false,
  "message": "Error description"
}

