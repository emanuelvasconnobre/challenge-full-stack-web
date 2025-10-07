import "reflect-metadata";

import express from "express";

import { registerRoutes } from "./routes";
import { exceptionHandler } from "@/shared/infrastructure/middlewares/exceptionHandler";
import setupSecurityMiddleware from "@/shared/infrastructure/middlewares/securityMiddleware";
import setupHttpLogMiddleware from "@/shared/infrastructure/middlewares/loggerMiddleware";

const app = express();

app.use(express.json());
setupHttpLogMiddleware(app);
setupSecurityMiddleware(app);

registerRoutes(app);

app.use(exceptionHandler);

export { app };
