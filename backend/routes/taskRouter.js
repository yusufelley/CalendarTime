import { Router } from "express";
import Task from "../models/TaskSchema.js";
import log from "../utils/logger.js";

export const taskRouter = Router();

// GET all tasks
taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
taskRouter.post("/", async (req, res) => {
  console.log(req.body);
  const task = new Task({
    title: req.body.title,
    deadline: req.body.deadline,
    description: req.body.description,
    maxTimeBlock: req.body.maxTimeBlock,
    estimatedTimeToCompletion: req.body.estimatedTimeToCompletion,
    startDate: req.body.startDate,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a single task by ID
taskRouter.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});

// DELETE a task
taskRouter.delete("/:id", getTask, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Task" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a task object by ID
export async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}
