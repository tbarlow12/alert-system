import { Alert } from "./alert";

export interface Sender {
  send: (alert: Alert, target: string) => Promise<void>;
}