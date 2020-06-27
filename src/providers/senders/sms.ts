import { Alert, Logger, Member } from "../../models";
import { BaseSender } from "./baseSender";

export class SmsSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.phone;
  }

  protected formatMessage(alert: Alert): string {
    return alert.message
      .replace(/\\n+/g, " ");
  }
  
  protected async sendMessage(message: string, target: string): Promise<void> {
    this.info(`Sending SMS message to ${target}. Body: ${message}`);
  }
  
  protected async sendGroupMessage(message: string, targets: string[]): Promise<void[]> {
    return await Promise.all(targets.map(target => this.sendMessage(message, target)));
  }
}