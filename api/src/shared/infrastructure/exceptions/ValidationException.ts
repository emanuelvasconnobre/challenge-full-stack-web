import { AppException } from "@/shared/domain/exceptions/AppException";

export default class ValidationException extends AppException {
  constructor(options: {
    message?: string;
    validatioeErrors: {
      fieldName: string;
      messages: object | {};
    }[];
  }) {
    super(options.message ?? "Validation Error", {
      errors: options.validatioeErrors,
    });
  }
}
