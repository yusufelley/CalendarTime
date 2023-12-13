import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import { taskRouter } from "./routes/taskRouter.js";
import log from "./utils/logger.js";
import logger from "morgan";
import cors from "cors";

const app = express();
app.use(cors());

// Initialize environment variables
dotenv.config();

export const PORT = process.env.PORT || 3001;

// Connect to database
connectDB(process.env.MONGODB_URI);

app.use(express.json());
app.use(logger("tiny"));

app.use("/task", taskRouter);

app.use((req, res, next) => {
  log.info(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("*", (req, res) => {
  log.warn(`Route not found: ${req.url}`);
  res.status(404).send("Route does not exist");
});

app.listen(PORT, () => {
  log.info(`Server Started on Port ${PORT}`);
});
