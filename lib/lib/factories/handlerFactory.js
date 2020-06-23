import { AzureFunctionsLogger, CompoundLogger, ConsoleLogger } from "../providers/loggers";
import { EmailSender, FacebookSender, SmsSender, TwitterSender } from "../providers/senders";
import { Factory } from "./factory";
import { constants } from "../utils";
export class HandlerFactory {
    static create(handler) {
        return async (context, trigger) => {
            const container = this.createServiceCollection(context);
            const { logger } = container;
            logger.info(`Executing function ${context.executionContext.functionName}`);
            try {
                await handler(context, trigger, container);
            }
            catch (err) {
                logger.error(`Caught global error in function ${context.executionContext.functionName}: ${err.message}`);
            }
        };
    }
    static createServiceCollection(context) {
        const logger = this.createCompoundLogger(context);
        const { functionName } = context.executionContext;
        const senderFactory = this.initializeSenderFactory(logger);
        return {
            logger,
            sender: (senderFactory.has(functionName)) ? senderFactory.get(functionName) : undefined,
        };
    }
    static createCompoundLogger(context) {
        return new CompoundLogger([
            new AzureFunctionsLogger(context),
            new ConsoleLogger()
        ]);
    }
    static initializeSenderFactory(logger) {
        const senderFactory = new Factory();
        const { sendEmailAlert, sendFacebookAlert, sendSmsAlert, sendTwitterAlert, } = constants.functionName;
        senderFactory.register(sendTwitterAlert, new TwitterSender(logger));
        senderFactory.register(sendEmailAlert, new EmailSender(logger));
        senderFactory.register(sendFacebookAlert, new FacebookSender(logger));
        senderFactory.register(sendSmsAlert, new SmsSender(logger));
        return senderFactory;
    }
}
//# sourceMappingURL=handlerFactory.js.map