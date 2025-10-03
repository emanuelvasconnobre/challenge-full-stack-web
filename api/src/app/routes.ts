import { Express } from "express";
import healthRoutes from "@/modules/health/interfaces/http/health.routes"

export function registerRoutes(app: Express) {
 app.use("/health", healthRoutes);
}