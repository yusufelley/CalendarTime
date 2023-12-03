import express from "express";
import { createLogger, transports, format } from "winston";
import connectDB from "./database.js";
import dotenv from "dotenv";

const app = express();

// Initialize environment variables
dotenv.config();

export const PORT = process.env.PORT || 3001;

// Connect to database
connectDB(process.env.MONGODB_URI);

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    new transports.Console(), // Log to the console
    // new transports.File({ filename: "app.log" }), // Log to a file
  ],
});

app.use(express.json());

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
