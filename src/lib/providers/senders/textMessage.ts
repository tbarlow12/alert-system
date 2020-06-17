import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";

export class FacebookSender extends BaseSender {
  
  public async send(alert: Alert, phoneNumber: string) {
    console.log(`Sending text ${alert.message} to ${phoneNumber}`);
  }
}