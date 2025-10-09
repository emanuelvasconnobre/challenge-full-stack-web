import { AppException } from "./AppException";

type ValidationErrors = {
  fieldName: string;
  messages: object | {};
}[];

export default class ValidationException extends AppException<{ errors: ValidationErrors }> {
  constructor(options: {
    message?: string;
    validationErrors: {
      fieldName: string;
      messages: object | {};
    }[];
  }) {
    super(options.message ?? "Validation Error", {
      errors: options.validationErrors,
    });
  }
}
