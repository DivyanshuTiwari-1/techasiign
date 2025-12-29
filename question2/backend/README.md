# Habit Tracker Backend API

Express.js backend API for the Habit Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017/habittracker
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

3. Start MongoDB (if running locally)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

#### POST /auth/login
Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

### Habits

All habit endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### GET /habits
List all habits for the authenticated user.

**Response:**
```json
{
  "success": true,
  "habits": [...],
  "count": 5
}
```

#### POST /habits
Create a new habit.

**Request Body:**
```json
{
  "name": "Drink 8 glasses of water",
  "description": "Stay hydrated throughout the day"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Habit created successfully",
  "habit": {...}
}
```

#### POST /habits/:id/complete
Mark a habit as complete for today.

**Response:**
```json
{
  "success": true,
  "message": "Habit marked as complete for today",
  "habit": {...}
}
```

#### GET /habits/:id/status?date=YYYY-MM-DD
Check if a habit is completed on a given date. If date is not provided, checks today's date.

**Response:**
```json
{
  "success": true,
  "habitId": "habit-id",
  "date": "2024-01-15",
  "completed": true
}
```

## Models

### User
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `createdAt` (Date)

### Habit
- `userId` (ObjectId, ref: User, required)
- `name` (String, required)
- `description` (String, optional)
- `completions` (Array of { date: Date })
- `createdAt` (Date)

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

