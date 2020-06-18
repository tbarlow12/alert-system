import { Logger } from "./logger";
import { Sender } from "./sender";

export interface IocContainer {
  logger: Logger;
  sender?: Sender;
}