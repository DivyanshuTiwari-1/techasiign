const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const authenticate = require('../middleware/auth');

/**
 * GET /habits
 * List all habits for the authenticated user
 * Requires authentication
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId })
      .sort({ createdAt: -1 }); // Most recent first
    
    res.json({
      success: true,
      habits: habits,
      count: habits.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching habits'
    });
  }
});

/**
 * POST /habits
 * Create a new habit for the authenticated user
 * Body: { name: string, description?: string }
 * Requires authentication
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validate input
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Habit name is required'
      });
    }
    
    // Create new habit
    const habit = new Habit({
      userId: req.userId,
      name: name.trim(),
      description: description ? description.trim() : ''
    });
    
    await habit.save();
    
    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      habit: habit
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating habit'
    });
  }
});

/**
 * POST /habits/:id/complete
 * Mark a habit as done for today
 * Requires authentication
 */
router.post('/:id/complete', authenticate, async (req, res) => {
  try {
    const habitId = req.params.id;
    
    // Find habit and verify ownership
    const habit = await Habit.findOne({ _id: habitId, userId: req.userId });
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    // Mark as complete for today
    const wasNewlyAdded = habit.markCompleteToday();
    
    if (!wasNewlyAdded) {
      return res.json({
        success: true,
        message: 'Habit already marked as complete for today',
        habit: habit
      });
    }
    
    await habit.save();
    
    res.json({
      success: true,
      message: 'Habit marked as complete for today',
      habit: habit
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Error marking habit as complete'
    });
  }
});


router.get('/:id/status', authenticate, async (req, res) => {
  try {
    const habitId = req.params.id;
    const dateParam = req.query.date;
    
    // Parse date or use today
    let checkDate;
    if (dateParam) {
      checkDate = new Date(dateParam);
      if (isNaN(checkDate.getTime())) {
        return res.status(400).json({
          success: false,
          error: 'Invalid date format. Use YYYY-MM-DD'
        });
      }
    } else {
      checkDate = new Date();
    }
    
    // Find habit and verify ownership
    const habit = await Habit.findOne({ _id: habitId, userId: req.userId });
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Habit not found'
      });
    }
    
    // Check if completed on the given date
    const isCompleted = habit.isCompletedOnDate(checkDate);
    
    res.json({
      success: true,
      habitId: habitId,
      date: checkDate.toISOString().split('T')[0], // Return date in YYYY-MM-DD format
      completed: isCompleted
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid habit ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Error checking habit status'
    });
  }
});

module.exports = router;

