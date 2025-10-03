import { Request, Response } from "express";

export class HealthController {
  liveness(_req: Request, res: Response) {
    return res.status(200).json({ status: "ok", message: "Service is alive" });
  }

  readiness(_req: Request, _res: Response) {
    // TODO: implement readiness health checks after implement db connection and tirty-party dependencies.
    throw new Error("Implementation Error");
  }
}
