const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  maxTimeBlock: {
    type: Number,
    default: 60 // Default to 60 minutes
  },
  estimatedTimeToCompletion: {
    type: Number,
    required: true // In hours
  },
  startDate: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
