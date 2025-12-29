const mongoose = require('mongoose');


const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true,
    maxlength: [100, 'Habit name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  completions: [{
    date: {
      type: Date,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


habitSchema.index({ userId: 1, 'completions.date': 1 });


habitSchema.methods.isCompletedOnDate = function(date) {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return this.completions.some(completion => {
    const completionDate = new Date(completion.date);
    completionDate.setHours(0, 0, 0, 0);
    return completionDate.getTime() === checkDate.getTime();
  });
};


habitSchema.methods.markCompleteToday = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if already completed today
  const alreadyCompleted = this.isCompletedOnDate(today);
  
  if (!alreadyCompleted) {
    this.completions.push({ date: today });
  }
  
  return !alreadyCompleted; // Return true if newly added
};

module.exports = mongoose.model('Habit', habitSchema);

