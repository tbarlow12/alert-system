import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";
import { Member } from "../../interfaces/member";

export class EmailSender extends BaseSender {
  
  protected getTarget(member: Member): string {
    return member.email;
  }
  
  protected formatMessage(alert: Alert): string {
    throw new Error("Method not implemented.");
  }
  
  protected sendMessage(message: string, emailAddress: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  protected sendGroupMessage(message: string, targets: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}