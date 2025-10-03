import { Request, Response, NextFunction } from "express";
import { AppException } from "@/shared/domain/exceptions/AppException";
import { AppHttpException } from "@/shared/domain/exceptions/AppHttpException";

export function exceptionHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err instanceof AppHttpException) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      details: err.details || null,
    });
  }

  if (err instanceof AppException) {
    return res.status(500).json({
      error: err.name,
      message: err.message,
      details: err.details || null,
    });
  }

  return res.status(500).json({
    error: "InternalServerError",
    message: "Unexpected error",
  });
}
