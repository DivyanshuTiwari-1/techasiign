# Practical Test - Assignment Tech

This repository contains solutions for two practical test questions:

1. **Question 1**: JSON Manipulation API
2. **Question 2**: Habit Tracker (Full-stack application)

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Project Structure

```
assigntech/
├── question1/              # JSON Manipulation API
│   ├── src/
│   ├── data/
│   └── package.json
├── question2/              # Habit Tracker
│   ├── backend/           # Node.js/Express API
│   └── frontend/          # Next.js React application
└── README.md
```

## Question 1: JSON Manipulation API

A REST API that processes company data from TEST.json and provides 4 query endpoints.

### Setup

1. Navigate to question1 directory:
```bash
cd question1
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

### API Endpoints

- `GET /api/average-budget` - Get average budget of active Marketing campaigns
- `GET /api/completed-projects` - Get completed Engineering projects
- `GET /api/top-manager` - Get manager with most running projects/campaigns
- `GET /api/same-team-projects` - Get projects with same team members

See [question1/README.md](question1/README.md) for detailed documentation.

## Question 2: Habit Tracker

A full-stack habit tracking application with user authentication.

### Backend Setup

1. Navigate to backend directory:
```bash
cd question2/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
MONGODB_URI=mongodb://localhost:27017/habittracker
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd question2/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` by default.

### Features

- User authentication (signup/login) with JWT
- Create and manage habits
- Mark habits as complete for today
- Visual indicators for completion status
- Check habit status for any date

### API Endpoints

**Authentication:**
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

**Habits:**
- `GET /habits` - List habits for current user
- `POST /habits` - Create a new habit
- `POST /habits/:id/complete` - Mark habit as done for today
- `GET /habits/:id/status?date=YYYY-MM-DD` - Check if habit is completed on a given day

## Environment Variables

### Question 2 Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/habittracker
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

### Question 2 Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Complete Application

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start Backend** (Terminal 1):
```bash
cd question2/backend
npm start
```

3. **Start Frontend** (Terminal 2):
```bash
cd question2/frontend
npm run dev
```

4. Open `http://localhost:3000` in your browser

## Testing

### Question 1
Test endpoints using curl or Postman:
```bash
curl http://localhost:3001/api/average-budget
curl http://localhost:3001/api/completed-projects
curl http://localhost:3001/api/top-manager
curl http://localhost:3001/api/same-team-projects
```

### Question 2
1. Sign up a new account at `/login`
2. Create habits from the dashboard
3. Mark habits as complete
4. Verify completion status indicators

## Technologies Used

### Question 1
- Node.js
- Express.js
- CORS

### Question 2 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt

### Question 2 Frontend
- Next.js 14
- React
- TypeScript
- Context API

## Notes

- All code is commented to explain the approach
- Error handling is implemented throughout
- Authentication is required for all habit endpoints
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days

## Git Repository

Share Git repo access with IT environment in email as requested.

