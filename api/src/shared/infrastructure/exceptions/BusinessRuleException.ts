import { AppException } from "@/shared/domain/exceptions/AppException";

export default class BusinessRuleException extends AppException {
  constructor(options: {
    message?: string;
    validatioeErrors: {
      fieldName: string;
      messages: object | {};
    }[];
  }) {
    super(options.message ?? "Business Rule Validation Error", {
      errors: options.validatioeErrors,
    });
  }
}
