import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";

export class FacebookSender extends BaseSender {
  
  public async send(alert: Alert, userId: string) {
    console.log(`Sending facebook ${alert.message} to ${userId}`);
  }
}