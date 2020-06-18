import { AzureFunction, Context } from "@azure/functions";
import { IocContainer, Sender, Logger } from "../models";
import { AzureFunctionsLogger, CompoundLogger, ConsoleLogger } from "../providers/loggers";
import { EmailSender, FacebookSender, SmsSender, TwitterSender } from "../providers/senders";
import { Factory } from "./factory";
import { constants } from "../utils";

export class HandlerFactory {

  public static create<T>(handler: (context: Context, trigger: T, container: IocContainer) => Promise<void>): AzureFunction {
    return async (context: Context, trigger: T) => {
      const container = this.createIocContainer(context);
      const { logger } = container;
      logger.info(`Executing function ${context.executionContext.functionName}`);
      try {
        await handler(context, trigger, container);
      } catch(err) {
        logger.error(`Caught global error in function ${context.executionContext.functionName}: ${err.message}`);
      }
    }
  }

  private static createIocContainer(context: Context): IocContainer {
    const logger = this.createCompoundLogger(context);
    const { functionName } = context.executionContext;
    const senderFactory = this.initializeSenderFactory(logger);
    return {
      logger,
      sender: (senderFactory.has(functionName)) ? senderFactory.get(functionName) : undefined,
    }
  }

  private static createCompoundLogger(context: Context): Logger {
    return new CompoundLogger([
      new AzureFunctionsLogger(context),
      new ConsoleLogger()
    ]);
  }

  private static initializeSenderFactory(logger: Logger): Factory<Sender> {
    const senderFactory = new Factory<Sender>();
    const {
      sendEmailAlert,
      sendFacebookAlert,
      sendSmsAlert,
      sendTwitterAlert,
    } = constants.functionName;
    senderFactory.register(sendTwitterAlert, new TwitterSender(logger));
    senderFactory.register(sendEmailAlert, new EmailSender(logger));
    senderFactory.register(sendFacebookAlert, new FacebookSender(logger));
    senderFactory.register(sendSmsAlert, new SmsSender(logger))
    return senderFactory;
  }
}