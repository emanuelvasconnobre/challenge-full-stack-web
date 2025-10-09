export class AppException extends Error {
  public readonly name: string;
  public readonly details?: object;

  constructor(message: string, details?: object) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
