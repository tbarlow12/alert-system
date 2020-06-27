import { HandlerFactory } from "../providers/factories";
export const run = HandlerFactory.create(async (_context, alert, serviceCollection) => {
    const { sender } = serviceCollection;
    await sender.sendAlert(alert);
});
//# sourceMappingURL=sendAlert.js.map