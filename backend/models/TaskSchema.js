import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  estimatedDuration: {
    type: Number,
    required: true,
  },
  minTimeBlock: {
    type: Number,
    required: true,
  },
  maxTimeBlock: {
    type: Number,
    default: 60, // Default to 60 minutes
  },
  canSplit: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    defailt: "#3498DB", // blue
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
