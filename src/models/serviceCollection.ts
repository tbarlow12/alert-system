import { Logger } from "./logger";
import { Sender } from "./sender";
import { QueueProviderFactory } from "../providers/factories/queueProviderFactory";

export interface ServiceCollection {
  logger: Logger;
  sender?: Sender;
  queueProviderFactory?: QueueProviderFactory
}