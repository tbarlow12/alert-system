import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";
import { Member } from "../../interfaces/member";

export class TwitterSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.twitter;
  }
  
  protected formatMessage(alert: Alert): string {
    throw new Error("Method not implemented.");
  }
  
  protected sendMessage(message: string, target: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  protected sendGroupMessage(message: string, targets: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}