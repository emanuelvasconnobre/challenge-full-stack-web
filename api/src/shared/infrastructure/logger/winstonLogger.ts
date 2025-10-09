import { createLogger, format, Logger, transports } from "winston";
import ILogger from "./ILogger";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack, name, ...metadata }) => {
  const metaString = Object.keys(metadata).length > 0 ? ` ${JSON.stringify(metadata)}` : "";

  return `[${timestamp}] ${name} - ${level}: ${stack || message}\n${metaString}`;
});

export class WinstonLogger implements ILogger {
  name: string;
  private logger: Logger;

  constructor(name: string) {
    this.name = name;
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat,
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new transports.File({
          filename: "logs/combined.log",
        }),
      ],
    });
  }

  log(message: string, metadata?: Record<string, string | number | object>): void {
    this.logger.log("info", message, { ...metadata, name: this.name });
  }
  error(message: string | Error, metadata?: Record<string, string | number | object>): void {
    if (message instanceof Error) {
      this.logger.log("error", message.message, {
        stack: message.stack,
        ...metadata,
        name: this.name,
      });
    } else {
      this.logger.log("error", message, { ...metadata, name: this.name });
    }
  }
  warn(message: string, metadata?: Record<string, string | number | object>): void {
    this.logger.log("warn", message, { ...metadata, name: this.name });
  }
}
