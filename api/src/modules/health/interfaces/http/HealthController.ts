import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import makeLoggerInstance from "@/shared/infrastructure/logger";
import checkDatabase from "@/shared/utils/checkDatabase";

import { Request, Response } from "express";

const logger = makeLoggerInstance("HealthController");
export class HealthController {
  liveness(_req: Request, res: Response) {
    return res.status(200).json({ status: "ok", message: "Service is alive" });
  }

  async readiness(_req: Request, res: Response) {
    try {
      await checkDatabase(prismaClient);

      return res.status(200).json({
        status: "ok",
        message: "Application is ready",
      });
    } catch (error) {
      logger.error(`Readiness check failed: ${error}`);
      return res.status(503).json({
        status: "error",
        message: "Database not ready",
      });
    }
  }
}
