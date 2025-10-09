import { app } from "@/app/server";
import envSettings from "@/config/env";
import makeLoggerInstance from "./shared/infrastructure/logger";

const logger = makeLoggerInstance("server");

app.listen(envSettings.port, () => {
  if (envSettings.nodeEnv === "development") {
    logger.log(`Env variables: \n ${JSON.stringify(envSettings)}`);
  }
  logger.log(`Server running on port ${envSettings.port}`);
});
