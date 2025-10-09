import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import ValidationException from "../exceptions/ValidationException";
import { NextFunction, Request, Response } from "express";

export default function validateDTOMiddleware(DTOClass: any, target: "body" | "query" = "body") {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DTOClass, req[target]);
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
        message: `Validation failed (Request ${target.toUpperCase()})`,
        validatioeErrors: messages,
      });

      return res.status(400).json(exception);
    }

    req.dtoInstance = dto;
    next();
  };
}
