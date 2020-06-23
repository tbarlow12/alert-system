import { Alert, Member } from "../../models";
import { BaseSender } from "./baseSender";

export class EmailSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.email;
  }
  
  protected formatMessage(alert: Alert): string {
    return JSON.stringify(alert, null, 2);
  }
  
  protected async sendMessage(message: string, emailAddress: string): Promise<void> {
    this.info(`Sending email to ${emailAddress}. Body: ${message}`);
  }
  
  protected async sendGroupMessage(message: string, emailAddresses: string[]): Promise<void> {
    this.info(`Sending email to ${emailAddresses.join(",")}. Body: ${message}`);
  }
}