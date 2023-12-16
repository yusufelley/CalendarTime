import { Router } from "express";
import Event from "../models/EventSchema.js";
import log from "../utils/logger.js";

export const eventRouter = Router();

// GET all events
eventRouter.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new event
eventRouter.post("/", async (req, res) => {
  const {
    name,
    repeating,
    date,
    startTime,
    endTime,
    location,
    description,
    color,
    priority,
  } = req.body;
  const event = new Event({
    name,
    repeating,
    date,
    startTime,
    endTime,
    location,
    description,
    color,
    priority,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single event by ID
eventRouter.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

// DELETE a event
eventRouter.delete("/:id", getEvent, async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Event" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a event
eventRouter.put("/:id", getEvent, async (req, res) => {
  const updatedEvent = req.body;
  try {
    const result = await Event.findOneAndUpdate(
      { _id: req.params.id },
      updatedEvent,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a event object by ID
export async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}
