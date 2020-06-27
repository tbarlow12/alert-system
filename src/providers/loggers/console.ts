import { Logger } from "../../models";

export class ConsoleLogger implements Logger {
  public debug(message: string) {
    console.debug(message);
  }
  
  public info(message: string) {
    console.info(message);
  }
  
  public warn(message: string) {
    console.warn(message);
  }
  
  public error(message: string) {
    console.error(message);
  }
}