import { Alert, Member } from "../../models";
import { BaseSender } from "./baseSender";

export class FacebookSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.facebook;
  }
  
  protected formatMessage(alert: Alert): string {
    return JSON.stringify(alert, null, 2);
  }
  
  protected async sendMessage(message: string, target: string): Promise<void> {
    this.info(`Sending Facebook message to ${target}. Body: ${message}`);
  }
  
  protected async sendGroupMessage(message: string, targets: string[]): Promise<void> {
    this.info(`Sending Facebook message to ${targets.join(",")}. Body: ${message}`);
  }
}