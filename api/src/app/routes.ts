import { Express } from "express";
import healthRoutes from "@/modules/health/interfaces/http/health.routes";
import studentRouter from "@/modules/studants/interfaces/http/student.routes";

export function registerRoutes(app: Express) {
  app.use("/health", healthRoutes);
  app.use("/students", studentRouter);
}
