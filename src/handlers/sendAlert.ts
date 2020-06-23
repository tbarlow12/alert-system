import { AzureFunction, Context } from "@azure/functions";
import { HandlerFactory } from "../lib/providers/factories";
import { Alert, ServiceCollection } from "../lib/models";

export const run: AzureFunction = HandlerFactory.create<Alert>(
  async (_context: Context, alert: Alert, serviceCollection: ServiceCollection) => {
    const { sender } = serviceCollection;
    await sender.sendAlert(alert);
  }
);