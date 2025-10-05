import { AppException } from "@/shared/domain/exceptions/AppException";

export default class DatabaseException extends AppException {
  constructor(options: { message?: string; stack?: any } = {}) {
    super(options.message ?? "Database Error", {
      stack: options.stack,
    });
  }
}
