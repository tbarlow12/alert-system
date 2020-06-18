import { Logger } from "../../interfaces/logger";
import { Logger as AzFuncLogger, Context } from "@azure/functions"

export class AzureFunctionsLogger implements Logger {
  
  private logger: AzFuncLogger;

  constructor(context: Context) {
    this.logger = context.log;
  }

  public debug(message: string) {
    this.logger.verbose(message);
  }
  
  public info(message: string) {
    this.logger.info(message);
  }
  
  public warn(message: string) {
    this.logger.warn(message);
  }
  
  public error(message: string) {
    this.logger.error(message);
  }
}
