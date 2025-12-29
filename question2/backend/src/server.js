const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Habit Tracker API',
    endpoints: {
      'POST /auth/signup': 'Register a new user',
      'POST /auth/login': 'Login user',
      'GET /habits': 'List habits for current user',
      'POST /habits': 'Create a new habit',
      'POST /habits/:id/complete': 'Mark habit as done for today',
      'GET /habits/:id/status?date=YYYY-MM-DD': 'Check if habit is completed on a given day'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

module.exports = app;

