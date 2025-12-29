# Question 1: JSON Manipulation API

This API provides endpoints to query and analyze company data from TEST.json.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### GET /api/average-budget
Returns the average budget of all active campaigns from Marketing department.

**Response:**
```json
{
  "success": true,
  "averageBudget": 75000,
  "message": "Average budget calculated successfully"
}
```

### GET /api/completed-projects
Returns all completed projects from Engineering department.

**Response:**
```json
{
  "success": true,
  "projects": [...],
  "count": 1,
  "message": "Completed projects retrieved successfully"
}
```

### GET /api/top-manager
Returns the manager who has the most running projects or campaigns.

**Response:**
```json
{
  "success": true,
  "manager": "Jane Smith",
  "message": "Top manager retrieved successfully"
}
```

### GET /api/same-team-projects
Returns project names that have the same team members.

**Response:**
```json
{
  "success": true,
  "projects": ["Project B", "Project X"],
  "count": 2,
  "message": "Projects with same team members retrieved successfully"
}
```

## Testing

You can test the endpoints using curl, Postman, or any HTTP client:

```bash
curl http://localhost:3001/api/average-budget
curl http://localhost:3001/api/completed-projects
curl http://localhost:3001/api/top-manager
curl http://localhost:3001/api/same-team-projects
```

