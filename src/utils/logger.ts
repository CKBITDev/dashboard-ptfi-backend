import winston from "winston";
import { logger } from "express-winston";

const prodTransports = [
  new winston.transports.File({ dirname: "logs", filename: "activity.log" }),
  new winston.transports.File({
    dirname: "logs",
    filename: "error.log",
    level: "error",
  }),
];

const devTransports = [
  new winston.transports.Console({ format: winston.format.cli() }),
];

const appLogger = logger({
  transports:
    process.env.NODE_ENV === "production" ? prodTransports : devTransports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export default appLogger
