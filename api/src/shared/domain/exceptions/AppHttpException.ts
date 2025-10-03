import { AppException } from "./AppException";

type Details = Record<string, string | object | number>

export class AppHttpException extends AppException {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, details?: Details) {
    super(message, details);
    this.statusCode = statusCode;
  }

  static badRequest(message = "Bad Request", details?: any) {
    return new AppHttpException(message, 400, details);
  }

  static notFound(message = "Not Found", details?: any) {
    return new AppHttpException(message, 404, details);
  }

  static unauthorized(message = "Unauthorized", details?: any) {
    return new AppHttpException(message, 401, details);
  }
}
