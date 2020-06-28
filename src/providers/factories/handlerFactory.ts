import { AzureFunction, Context } from "@azure/functions";
import { Logger, ServiceCollection, QueueProvider, Sender, Storage } from "../../models";
import { QueueType } from "../../models/queueType";
import { constants } from "../../utils";
import { AzureFunctionsLogger, CompoundLogger, ConsoleLogger } from "../loggers";
import { AzureStorageQueueProvider } from "../queue/azureStorageQueue";
import { EmailSender, FacebookSender, SmsSender, TwitterSender } from "../senders";
import { Factory } from "./factory";
import { JsonDataStorageProvider } from "../storage/jsonData";

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
    const storage = this.initializeStorage(logger);
    const senderFactory = this.initializeSenderFactory(logger, storage);
    const queueProviderFactory = this.initializeQueueProviderFactory(logger);
    return {
      logger,
      sender: (senderFactory.has(functionName)) ? senderFactory.get(functionName) : undefined,
      queueProviderFactory,
    }
  }

  private static initializeStorage(logger: Logger): Storage {
    return new JsonDataStorageProvider(logger);
  }

  private static initializeQueueProviderFactory(logger: Logger): Factory<QueueProvider> {
    const queueProviderFactory = new Factory<QueueProvider>();
    queueProviderFactory.register(QueueType.AZURE_STORAGE, new AzureStorageQueueProvider(logger));
    return queueProviderFactory;
  }

  private static createCompoundLogger(context: Context): Logger {
    return new CompoundLogger([
      new AzureFunctionsLogger(context),
      new ConsoleLogger()
    ]);
  }

  private static initializeSenderFactory(logger: Logger, storage: Storage): Factory<Sender> {
    const senderFactory = new Factory<Sender>();
    const {
      sendEmailAlert,
      sendFacebookAlert,
      sendSmsAlert,
      sendTwitterAlert,
    } = constants.functionName;
    senderFactory.register(sendTwitterAlert, new TwitterSender(logger, storage));
    senderFactory.register(sendEmailAlert, new EmailSender(logger, storage));
    senderFactory.register(sendFacebookAlert, new FacebookSender(logger, storage));
    senderFactory.register(sendSmsAlert, new SmsSender(logger, storage))
    return senderFactory;
  }
}