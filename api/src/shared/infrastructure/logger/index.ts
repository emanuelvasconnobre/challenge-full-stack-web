import { WinstonLogger } from "./winstonLogger";

export default function makeLoggerInstance(name: string) {
  return new WinstonLogger(name);
}
