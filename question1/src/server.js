const express = require('express');
const cors = require('cors');
const queriesRouter = require('./routes/queries');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/api', queriesRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'JSON Manipulation API',
    endpoints: {
      'GET /api/average-budget': 'Get average budget of active Marketing campaigns',
      'GET /api/completed-projects': 'Get completed Engineering projects',
      'GET /api/top-manager': 'Get manager with most running projects/campaigns',
      'GET /api/same-team-projects': 'Get projects with same team members'
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
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;

