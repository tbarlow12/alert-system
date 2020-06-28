import { Logger } from "../models";

export class BaseService {

  protected logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  protected log(message: string) {
    this.logger.info(message);
  }

  protected error(message: string) {
    this.logger.error(message);
  }

  protected warn(message: string) {
    this.logger.warn(message);
  }

  protected info(message: string) {
    this.logger.info(message);
  }

  protected debug(message: string) {
    this.logger.debug(message);
  }
}