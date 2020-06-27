import { Logger, Storage } from "../models";

export class BaseService {

  protected logger: Logger;
  protected storage: Storage;

  constructor(logger: Logger, storage: Storage) {
    this.logger = logger;
    this.storage = storage;
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