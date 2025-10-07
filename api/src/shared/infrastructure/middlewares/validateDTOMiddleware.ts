import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

import ValidationException from "../exceptions/ValidationException";

export default function validateDTOMiddleware(DTOClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DTOClass, req.body);
    const errors = await validate(dto, {
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      stopAtFirstError: false,
    });

    if (errors.length > 0) {
      const messages = errors
        .map((err) => ({ fieldName: err.property, messages: err.constraints || {} }))
        .flat();

      const exception = new ValidationException({
        message: "Validation failed",
        validatioeErrors: messages,
      });

      return res.status(400).json(exception);
    }

    req.body = dto;
    next();
  };
}
