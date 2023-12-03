import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import { taskRouter } from "./routes/taskRouter.js";
import logger from "./utils/logger.js";

const app = express();

// Initialize environment variables
dotenv.config();

export const PORT = process.env.PORT || 3001;

// Connect to database
connectDB(process.env.MONGODB_URI);

app.use(express.json());

app.use("/task", taskRouter);

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("*", (req, res) => {
  logger.warn(`Route not found: ${req.url}`);
  res.status(404).send("Route does not exist");
});

app.listen(PORT, () => {
  logger.info(`Server Started on Port ${PORT}`);
});
