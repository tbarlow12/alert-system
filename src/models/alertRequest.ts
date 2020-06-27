import { Alert } from "./alert";
import { AlertPlatform } from "./platform";

export interface AlertRequest {
  alert: Alert;
  platforms?: AlertPlatform[];
}