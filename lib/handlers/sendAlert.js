import { HandlerFactory } from "../lib/factories";
export const run = HandlerFactory.create(async (context, alert, serviceCollection) => {
    const { sender } = serviceCollection;
    await sender.sendAlert(alert);
});
//# sourceMappingURL=sendAlert.js.map