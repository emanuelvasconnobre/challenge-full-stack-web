import { Router } from "express";
import { HealthController } from "./HealthController";

const healthRouter = Router();
const controller = new HealthController();

healthRouter.get("/liveness", (req, res) => controller.liveness(req, res));
healthRouter.get("/readiness", (req, res) => controller.readiness(req, res));

export default healthRouter;
