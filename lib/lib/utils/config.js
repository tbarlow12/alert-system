import { AlertPlatform } from "../models/platform";
export class Config {
    static platformQueueName(platform) {
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
}
//# sourceMappingURL=config.js.map