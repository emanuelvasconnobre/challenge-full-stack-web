export class AppException extends Error {
  public readonly name: string;
  public readonly details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
