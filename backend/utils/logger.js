import { createLogger, transports, format } from "winston";

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    new transports.Console(), // Log to the console
    // new transports.File({ filename: "app.log" }), // Log to a file
  ],
});

export default logger;
