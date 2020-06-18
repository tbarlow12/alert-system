import { AzureFunction, Context } from '@azure/functions';
import { Logger } from '../interfaces/logger';
import { AzureFunctionsLogger } from '../providers/loggers/azureFunctions';
import { CompoundLogger } from '../providers/loggers/compound';
import { ConsoleLogger } from '../providers/loggers/console';
import { Factory } from './factory';
import { Sender } from '../interfaces/sender';
import { constants } from '../utils/constants';
import { TwitterSender } from '../providers/senders/twitter';
import { EmailSender } from '../providers/senders/email';
import { FacebookSender } from '../providers/senders/facebook';
import { SmsSender } from '../providers/senders/sms';

export class HandlerFactory {

  public static create<T>(handler: (context: Context, trigger: T, logger: Logger, sender: Sender) => Promise<void>): AzureFunction {
    return async (context: Context, trigger: T) => {
      const logger = this.createCompoundLogger(context);
      logger.info(`Executing function ${context.executionContext.functionName}`);
      const senderFactory = this.initializeSenderFactory(logger);
      let sender: Sender = senderFactory.get(context.executionContext.functionName);
      try {
        await handler(context, trigger, logger, sender);
      } catch(err) {
        logger.error(`Caught global error in function ${context.executionContext.functionName}: ${err.message}`);
      }
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