import { Alert } from "../../interfaces/alert";
import { BaseSender } from "./baseSender";

export class TwitterSender extends BaseSender {
  
  public async send(alert: Alert, twitterHandle: string) {
    console.log(`Sending tweet ${alert.message} to ${twitterHandle}`);
  }
}