import { Request, Response } from "express";

export class HealthController {
  liveness(req: Request, res: Response) {
    return res.status(200).json({ status: "ok", message: "Service is alive" });
  }

  readiness(req: Request, res: Response) {
    // TODO: implement readiness health checks after implement db connection and tirty-party dependencies.
    throw new Error("Implementation Error")
  }
}
