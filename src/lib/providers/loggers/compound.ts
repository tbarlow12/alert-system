import { Logger } from "../../interfaces/logger";

export class CompoundLogger implements Logger {

  private loggers: Logger[];

  constructor(loggers: Logger[]) {
    this.loggers = loggers || [];
  }

  public addLogger(logger: Logger) {
    this.loggers.push(logger);
  }

  public debug(message: string) {
    this.loggers.forEach((logger) => logger.debug(message));
  }
  
  public info(message: string) {
    this.loggers.forEach((logger) => logger.info(message));
  }
  
  public warn(message: string) {
    this.loggers.forEach((logger) => logger.warn(message));
  }
  
  public error(message: string) {
    this.loggers.forEach((logger) => logger.error(message));
  }
}