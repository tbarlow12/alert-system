import { AzureFunction, Context } from "@azure/functions";
import { HandlerFactory } from "../lib/factories";
import { Alert, IocContainer } from "../lib/models";

export const run: AzureFunction = HandlerFactory.create<Alert>(
  async (context: Context, alert: Alert, container: IocContainer) => {
    const { sender } = container;
    await sender.sendAlert(alert);
  }
);