import { Alerter } from "../../interfaces/alerter";
import { Alert } from "../../interfaces/alert";
import { MemberGroup } from "../../interfaces/memberGroup";

export class TextMessageAlerter implements Alerter {
  
  public async send(alert: Alert, group?: MemberGroup) {
    throw new Error("Not implemented");
  }
}