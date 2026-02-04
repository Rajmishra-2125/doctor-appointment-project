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

```
backend/
├── src/
│   ├── models/
│   │   ├── user.model.js
│   │   ├── doctor.model.js
│   │   ├── patient.model.js
│   │   ├── appointment.model.js
│   │   ├── review.model.js
│   │   ├── follow.model.js
│   │   ├── session.model.js
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── doctor.controller.js
│   │   ├── patient.controller.js
│   │   ├── appointment.controller.js
│   │   ├── availability.controller.js
│   │   ├── review.controller.js
│   │   ├── follow.controller.js
│   │   └── index.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── doctor.routes.js
│   │   ├── patient.routes.js
│   │   ├── appointment.routes.js
│   │   ├── review.routes.js
│   │   ├── follow.routes.js
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validation.middleware.js
│   │   └── index.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── index.js
│   │
│   ├── jobs/
│   │   ├── accountDeletion.job.js
│   │   └── index.js
│   │
│   ├── migrations/
│   │   ├── 001_addSoftDeleteFields.js
│   │   ├── 002_addAvailabilityFields.js
│   │   └── README.md
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── index.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   └── index.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```


---

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

