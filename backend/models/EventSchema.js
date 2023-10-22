const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  repeating: {
    type: Boolean,
    default: false
  },
  when: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#FFFFFF' // Default to white color
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;