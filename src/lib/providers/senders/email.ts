import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";

export class EmailSender extends BaseSender {
  
  public async send(alert: Alert, emailAddress: string) {
    console.log(`Sending email ${alert.message} to ${emailAddress}`);
  }
}