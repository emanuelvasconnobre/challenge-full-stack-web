interface ILogger {
  name: string;
  log(message: string, metadata?: Record<string, string | number | object>): void;
  error(message: string | Error, metadata?: Record<string, string | number | object>): void;
  warn(message: string, metadata?: Record<string, string | number | object>): void;
}

export default ILogger;
