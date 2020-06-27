import { Alert, Member } from "../../models";
import { BaseSender } from "./baseSender";

export class TwitterSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.twitter;
  }
  
  protected formatMessage(alert: Alert): string {
    return JSON.stringify(alert, null, 2);
  }
  
  protected async sendMessage(message: string, target: string): Promise<void> {
    this.info(`Sending Twitter message to ${target}. Body: ${message}`);
  }
  
  protected async sendGroupMessage(message: string, targets: string[]): Promise<void> {
    this.info(`Sending Twitter message to ${targets.join(",")}. Body: ${message}`);
  }
}