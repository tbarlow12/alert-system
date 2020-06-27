import { Alert } from "./alert";

export interface Sender {
  sendAlert: (alert: Alert) => Promise<void>;
}