import { Express } from "express";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import envSettings from "@/config/env";

function setupRateLimiter(app: Express) {
  const limiter = rateLimit({
    windowMs: envSettings.rateLimit.windowMs,
    limit: envSettings.rateLimit.limit,
    message: "Too many requests, try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

function setupHttpsRedirect(app: Express) {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (req.secure) return next();
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

function setupHelmet(app: Express) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
}

function setupCors(app: Express) {
  app.use(
    cors({
      origin: envSettings.cors.origins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );
}

export default function setupSecurityMiddleware(app: Express) {
  app.disable("x-powered-by");
  app.use(hpp());

  setupCors(app);
  setupHelmet(app);
  setupRateLimiter(app);

  if (envSettings.https.secure) setupHttpsRedirect(app);
}
