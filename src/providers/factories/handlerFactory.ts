import { AzureFunction, Context } from "@azure/functions";
import { Logger, ServiceCollection } from "../../models";
import { QueueType } from "../../models/queueType";
import { constants } from "../../utils";
import { AzureFunctionsLogger, CompoundLogger, ConsoleLogger } from "../loggers";
import { AzureStorageQueueProvider } from "../queue/azureStorageQueue";
import { EmailSender, FacebookSender, SmsSender, TwitterSender } from "../senders";
import { QueueProviderFactory } from "./queueProviderFactory";
import { SenderFactory } from "./senderFactory";

export class HandlerFactory {

  public static create<T>(handler: (context: Context, trigger: T, container: ServiceCollection) => Promise<void>): AzureFunction {
    return async (context: Context, trigger: T) => {
      const container = this.createServiceCollection(context);
      const { logger } = container;
      logger.info(`Executing function ${context.executionContext.functionName}`);
      try {
        await handler(context, trigger, container);
      } catch(err) {
        logger.error(`Caught global error in function ${context.executionContext.functionName}: ${err.message}`);
      }
    }
  }

  private static createServiceCollection(context: Context): ServiceCollection {
    const logger = this.createCompoundLogger(context);
    const { functionName } = context.executionContext;
    const senderFactory = this.initializeSenderFactory(logger);
    const queueProviderFactory = this.initializeQueueProviderFactory(logger);
    return {
      logger,
      sender: (senderFactory.has(functionName)) ? senderFactory.get(functionName) : undefined,
      queueProviderFactory,
    }
  }

  private static initializeQueueProviderFactory(logger: Logger): QueueProviderFactory {
    const queueProviderFactory = new QueueProviderFactory();
    queueProviderFactory.register(QueueType.AZURE_STORAGE, new AzureStorageQueueProvider(logger));
    return queueProviderFactory;
  }

  private static createCompoundLogger(context: Context): Logger {
    return new CompoundLogger([
      new AzureFunctionsLogger(context),
      new ConsoleLogger()
    ]);
  }

  private static initializeSenderFactory(logger: Logger): SenderFactory {
    const senderFactory = new SenderFactory();
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