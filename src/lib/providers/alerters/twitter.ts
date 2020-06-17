import { Alerter } from "../../interfaces/alerter";
import { Alert } from "../../interfaces/alert";

export class TwitterAlerter implements Alerter {
  public async send(alert: Alert) {
    throw new Error("Not implemented");
  }
}