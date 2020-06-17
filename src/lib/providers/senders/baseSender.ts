import { Sender } from "../../interfaces/sender";
import { Alert } from "../../interfaces/alert";

export abstract class BaseSender implements Sender {

  public abstract send(alert: Alert, target: string);
}