import { AzureFunction, Context } from "@azure/functions";
import { HandlerFactory } from "../lib/factories/handlerFactory";
import { Alert } from "../lib/interfaces/alert";
import { Logger } from "../lib/interfaces/logger";
import { Sender } from "../lib/interfaces/sender";

export const run: AzureFunction = HandlerFactory.create<Alert>(
  async (context: Context, alert: Alert, logger: Logger, sender: Sender) => {
    await sender.sendAlert(alert);
  }
);