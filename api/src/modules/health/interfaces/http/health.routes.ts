import { Router } from "express";
import { HealthController } from "./HealthController";

const router = Router();
const controller = new HealthController();

router.get("/liveness", (req, res) => controller.liveness(req, res));
router.get("/readiness", (req, res) => controller.readiness(req, res));

export default router;