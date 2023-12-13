import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  repeating: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#F1C40F", // Default to yellow color
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
