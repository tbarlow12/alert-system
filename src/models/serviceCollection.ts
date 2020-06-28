import { Logger } from "./logger";
import { Sender } from "./sender";
import { Storage } from "./storage";
import { Factory } from "../providers/factories";
import { QueueProvider } from "./queueProvider";

export interface ServiceCollection {
  logger: Logger;
  storage?: Storage;
  sender?: Sender;
  queueProviderFactory?: Factory<QueueProvider>
}