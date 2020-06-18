import { Alert, Member, Logger } from "../../models";
import { BaseSender } from "./baseSender";
import * as twilio from "twilio"
import { MessageListInstanceCreateOptions } from "twilio/lib/rest/api/v2010/account/message"

export class SmsSender extends BaseSender {

  private twilioClient: twilio.Twilio

  constructor(logger: Logger) {
    super(logger);
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
      {}
    );
  }
  
  protected getTarget(member: Member): string {
    return member.phone;
  }

  protected formatMessage(alert: Alert): string {
    return alert.message
      .replace(/\\n+/g, " ");
  }
  
  protected async sendMessage(message: string, target: string): Promise<void> {
    const from = process.env.SMS_FROM_NUMBER;
    const messageData: MessageListInstanceCreateOptions = {
      from,
      to: target,
      body: message
    }
    const response = await this.twilioClient.messages.create(messageData);
    this.logger.info(`Sent message with id${response.sid}`);
    throw new Error("Method not implemented.");
  }
  
  protected sendGroupMessage(message: string, targets: string[]): Promise<void[]> {
    return Promise.all(targets.map(target => this.sendMessage(message, target)));
  }
}