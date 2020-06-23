import { Alert, Logger, Member } from "../../models";
import { BaseSender } from "./baseSender";

export class SmsSender extends BaseSender {

  // private twilioClient: twilio.Twilio

  constructor(logger: Logger) {
    super(logger);
    // this.twilioClient = twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN,
    //   {}
    // );
  }
  
  protected getTarget(member: Member): string {
    return member.phone;
  }

  protected formatMessage(alert: Alert): string {
    return alert.message
      .replace(/\\n+/g, " ");
  }
  
  protected async sendMessage(message: string, target: string): Promise<void> {
    // const from = process.env.SMS_FROM_NUMBER;
    this.info(`Sending SMS message to ${target}. Body: ${message}`);
    // const messageData: MessageListInstanceCreateOptions = {
    //   from,
    //   to: target,
    //   body: message
    // }
    // const response = await this.twilioClient.messages.create(messageData);
    // this.info(`Sent message with id${response.sid}`);
    // throw new Error("Method not implemented.");
  }
  
  protected async sendGroupMessage(message: string, targets: string[]): Promise<void[]> {
    return await Promise.all(targets.map(target => this.sendMessage(message, target)));
  }
}