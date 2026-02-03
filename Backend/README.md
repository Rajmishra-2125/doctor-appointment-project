# 🤖 Doctor Appointment System – Backend Agents Guide

This document defines all **AI agents** that can assist in building, maintaining, and scaling the backend of the Doctor Appointment Booking System.

---

## 📋 Table of Contents

1. [Architecture Agent](#architecture-agent)
2. [Database Agent](#database-agent)
3. [Authentication Agent](#authentication-agent)
4. [API Development Agent](#api-development-agent)
5. [Security Agent](#security-agent)
6. [Testing Agent](#testing-agent)
7. [Performance Agent](#performance-agent)
8. [Documentation Agent](#documentation-agent)

---

## 🏗️ Architecture Agent

**Role:** System Design & Structure Specialist

### Responsibilities

- Design scalable backend architecture
- Define folder structure and code organization
- Choose appropriate design patterns (MVC, Repository, etc.)
- Plan microservices vs monolithic approach
- Define data flow and system boundaries

### Key Deliverables

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middlewares/    # Custom middleware
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── validators/     # Input validation
├── tests/
└── docs/
```

### Example Tasks

- "Design the appointment booking flow architecture"
- "Suggest folder structure for notification system"
- "How should we separate doctor and patient logic?"

---

## 🗄️ Database Agent

**Role:** Data Modeling & Database Optimization Specialist

### Responsibilities

- Design MongoDB schemas and relationships
- Optimize queries and indexing
- Handle data migrations
- Implement database connection pooling
- Design aggregation pipelines

### Key Schemas

#### User Model
```javascript
{
  name, email, password, role,
  avatar, phone, dateOfBirth,
  address, createdAt, updatedAt
}
```

#### Doctor Model
```javascript
{
  userId (ref), specialization,
  qualifications, experience,
  consultationFee, availability,
  followers: [userId], rating
}
```

#### Appointment Model
```javascript
{
  patientId, doctorId, date,
  timeSlot, status, symptoms,
  prescription, createdAt
}
```

### Example Tasks

- "Create indexes for appointment queries"
- "Design aggregation for doctor statistics"
- "Optimize follower count queries"

---

## 🔐 Authentication Agent

**Role:** Security & Identity Management Specialist

### Responsibilities

- Implement JWT authentication flow
- Handle password hashing (bcrypt)
- Manage access & refresh tokens
- Implement role-based access control (RBAC)
- Handle OAuth integration (Google, Facebook)

### Authentication Flow

```
Registration
  → Hash Password (bcrypt)
  → Save User
  → Generate JWT
  → Return Tokens

Login
  → Validate Credentials
  → Compare Password
  → Generate JWT (Access + Refresh)
  → Set HTTP-only Cookies
  → Return User Data

Protected Routes
  → Verify JWT
  → Decode Token
  → Attach User to Request
  → Proceed to Controller
```

### Middleware Structure

```javascript
// Auth Middleware
- verifyToken()
- isDoctor()
- isPatient()
- isOwner()
```

### Example Tasks

- "Implement refresh token rotation"
- "Add Google OAuth login"
- "Create role verification middleware"

---

## 🛣️ API Development Agent

**Role:** RESTful API Design & Implementation Specialist

### Responsibilities

- Design REST API endpoints
- Implement CRUD operations
- Handle request validation
- Structure responses consistently
- Implement pagination, filtering, sorting

### API Structure

#### Auth Routes
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

#### User Routes
```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/avatar
DELETE /api/users/account
```

#### Doctor Routes
```
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors/profile
PUT    /api/doctors/profile
POST   /api/doctors/:id/follow
DELETE /api/doctors/:id/unfollow
GET    /api/doctors/:id/availability
POST   /api/doctors/availability
```

#### Appointment Routes
```
GET    /api/appointments
GET    /api/appointments/:id
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
PATCH  /api/appointments/:id/status
GET    /api/appointments/doctor/:doctorId
GET    /api/appointments/patient/:patientId
```

#### Review Routes
```
POST   /api/reviews
GET    /api/reviews/doctor/:doctorId
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

### Response Format

```javascript
// Success Response
{
  success: true,
  message: "Operation successful",
  data: {...}
}

// Error Response
{
  success: false,
  message: "Error description",
  errors: [...]
}
```

### Example Tasks

- "Create appointment booking endpoint with validation"
- "Implement doctor search with filters"
- "Add pagination to appointments list"

---

## 🛡️ Security Agent

**Role:** Application Security & Best Practices Specialist

### Responsibilities

- Implement input validation and sanitization
- Prevent common vulnerabilities (SQL injection, XSS, CSRF)
- Set up rate limiting
- Implement CORS properly
- Handle sensitive data securely
- Set security headers (Helmet.js)

### Security Checklist

#### Input Validation
```javascript
- Use express-validator
- Validate all user inputs
- Sanitize data before DB operations
- Implement request size limits
```

#### Rate Limiting
```javascript
// General API
- 100 requests per 15 minutes

// Auth endpoints
- 5 login attempts per 15 minutes
- 3 registration attempts per hour
```

#### Environment Variables
```
- JWT_SECRET
- REFRESH_SECRET
- MONGODB_URI
- CLOUDINARY_KEY (for images)
```

#### Security Headers
```javascript
helmet({
  contentSecurityPolicy: true,
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true
})
```

### Example Tasks

- "Add input validation for appointment booking"
- "Implement rate limiter for login endpoint"
- "Set up CORS for frontend domain"

---

## 🧪 Testing Agent

**Role:** Quality Assurance & Test Coverage Specialist

### Responsibilities

- Write unit tests for services
- Create integration tests for APIs
- Implement E2E testing
- Set up test database
- Generate coverage reports

### Testing Stack

```
- Jest (Test runner)
- Supertest (API testing)
- MongoDB Memory Server (Test DB)
- Faker.js (Mock data)
```

### Test Structure

```
tests/
├── unit/
│   ├── services/
│   ├── utils/
│   └── validators/
├── integration/
│   ├── auth.test.js
│   ├── users.test.js
│   ├── doctors.test.js
│   └── appointments.test.js
└── e2e/
    └── booking-flow.test.js
```

### Example Test Cases

#### Authentication
- User registration with valid data
- Login with correct credentials
- Token verification
- Refresh token rotation

#### Appointments
- Book available slot
- Prevent double booking
- Cancel appointment
- Update appointment status

### Example Tasks

- "Write integration tests for doctor endpoints"
- "Create unit tests for appointment service"
- "Set up automated testing pipeline"

---

## ⚡ Performance Agent

**Role:** Optimization & Scalability Specialist

### Responsibilities

- Optimize database queries
- Implement caching strategies
- Handle concurrent requests
- Monitor server performance
- Optimize API response times

### Optimization Strategies

#### Database Optimization
```javascript
// Indexing
- Create indexes on frequently queried fields
- Compound indexes for complex queries
- Text indexes for search

// Query Optimization
- Use select() to limit returned fields
- Implement lean() for read-only operations
- Use aggregation pipelines wisely
```

#### Caching
```javascript
// Redis for:
- Session management
- Frequently accessed doctor profiles
- Available time slots
- Popular searches

// Cache Strategy
- Cache-aside pattern
- TTL: 5-15 minutes for dynamic data
- Invalidate on updates
```

#### API Optimization
```javascript
// Pagination
- Default: 10 items per page
- Max: 100 items per page

// Compression
- Use compression middleware
- Gzip responses

// Connection Pooling
- MongoDB connection pool size: 10-50
```

### Monitoring Tools

```
- PM2 (Process manager)
- New Relic / DataDog (APM)
- MongoDB Atlas Performance Advisor
- Winston (Logging)
```

### Example Tasks

- "Optimize doctor search query"
- "Implement Redis caching for appointments"
- "Set up performance monitoring"

---

## 📚 Documentation Agent

**Role:** API Documentation & Developer Experience Specialist

### Responsibilities

- Create comprehensive API documentation
- Write inline code comments
- Generate Swagger/OpenAPI specs
- Create README files
- Document environment setup

### Documentation Tools

```
- Swagger/OpenAPI
- Postman Collections
- JSDoc comments
- README.md files
```

### Documentation Structure

```
docs/
├── api/
│   ├── authentication.md
│   ├── users.md
│   ├── doctors.md
│   └── appointments.md
├── setup/
│   ├── installation.md
│   ├── environment.md
│   └── deployment.md
└── guides/
    ├── booking-flow.md
    └── testing.md
```

### API Documentation Template

```markdown
## Endpoint Name

**Method:** POST
**URL:** `/api/appointments`
**Auth Required:** Yes
**Permissions:** Patient

### Request Body
```json
{
  "doctorId": "string",
  "date": "YYYY-MM-DD",
  "timeSlot": "HH:MM"
}
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "appointmentId": "...",
    "status": "pending"
  }
}
```

### Error Responses
- 400: Invalid input
- 401: Unauthorized
- 409: Slot already booked
```

### Example Tasks

- "Generate Swagger docs for all endpoints"
- "Create deployment guide for production"
- "Document error codes and messages"

---

## 🎯 Agent Collaboration Flow

Different agents work together based on the development phase:

### Phase 1: Foundation
```
Architecture Agent → Database Agent → API Development Agent
```

### Phase 2: Security
```
Security Agent → Authentication Agent → Testing Agent
```

### Phase 3: Optimization
```
Performance Agent → Database Agent → Testing Agent
```

### Phase 4: Documentation
```
Documentation Agent → (All Agents for Review)
```

---

## 🚀 How to Use This Guide

1. **Identify your current task** (e.g., "Create appointment booking endpoint")
2. **Choose the relevant agent** (API Development Agent)
3. **Check agent's responsibilities and examples**
4. **Follow the guidelines and best practices**
5. **Collaborate with other agents if needed** (Security Agent for validation)

---

## 💡 Agent Prompt Templates

### For Architecture Decisions
```
"As the Architecture Agent, design the structure for [feature name]. 
Include folder organization, key files, and data flow."
```

### For API Development
```
"As the API Development Agent, create the following endpoints for [feature]:
- List all required routes
- Define request/response formats
- Include validation rules"
```

### For Security Implementation
```
"As the Security Agent, review [feature] and:
- Identify security risks
- Suggest validation rules
- Recommend rate limits"
```

### For Testing
```
"As the Testing Agent, create test cases for [feature]:
- Unit tests for services
- Integration tests for APIs
- Edge cases and error scenarios"
```

---

**This guide should be referenced whenever you need specialized assistance in backend development.**

**Each agent represents a focused expertise area to maintain code quality and best practices.**