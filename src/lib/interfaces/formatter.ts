import { Alert } from "./alert";

export interface AlertForamtter {
  brief: (alert: Alert) => string;
  verbose: (alert: Alert) => string;
}