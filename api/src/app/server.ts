import express from "express";

import { registerRoutes } from "./routes";
import { exceptionHandler } from "@/shared/infrastructure/middlewares/exceptionHandler";

const app = express();

app.use(express.json());

registerRoutes(app);
app.use(exceptionHandler);

export { app };
