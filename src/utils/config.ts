import { AlertPlatform } from "../models/platform";
import { QueueType } from "../models/queueType";

export class Config {
  
  public static platformQueueName(platform: AlertPlatform) {
    switch (platform) {
      case AlertPlatform.TWITTER:
        return process.env.TWITTER_MESSAGE_QUEUE_NAME;
      case AlertPlatform.EMAIL:
        return process.env.EMAIL_MESSAGE_QUEUE_NAME;
      case AlertPlatform.SMS:
        return process.env.SMS_MESSAGE_QUEUE_NAME;
      case AlertPlatform.FACEBOOK:
        return process.env.FACEBOOK_MESSAGE_QUEUE_NAME;
      default:
        throw new Error(`Unsupported queue platform: ${platform}`);
    }
  }

  public static queueType(): QueueType {
    return QueueType[process.env.QUEUE_PROVIDER]
  }
}