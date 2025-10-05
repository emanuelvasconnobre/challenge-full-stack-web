import morgan from "morgan";
import { Express } from "express";
import makeLoggerInstance from "../logger";

const logger = makeLoggerInstance("morgan_middleware");

export default function setupHttpLogMiddleware(app: Express) {
  const middleware = morgan(function (tokens, req, res) {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");

    logger.log(log);

    return undefined;
  });

  app.use(middleware);
}
