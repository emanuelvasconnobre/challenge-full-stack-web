import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const safeParseInt = (value?: string) => {
  try {
    if (!value || typeof value !== "string") return undefined;

    return parseInt(value);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
const toBoolean = (value?: string) => value === "1" || value?.toLowerCase() === "true";

const envSettings = {
  nodeEnv: process.env["NODE_ENV"] || "development",
  port: process.env["PORT"] || 8000,
  https: {
    secure: toBoolean(process.env["SECURE"]),
  },
  cors: {
    origins: process.env["ORIGINS_ALLOWED"]?.split(",") || ["*"],
  },
  rateLimit: {
    windowMs: safeParseInt(process.env["RATE_LIMIT_WINDOW_MS"]) || 15 * 60 * 1000,
    limit: safeParseInt(process.env["RATE_LIMIT_MAX"]) || 100,
  },
};

export default envSettings;
