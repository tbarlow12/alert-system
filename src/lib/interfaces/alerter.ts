import { Alert } from "./alert";
import { MemberGroup } from "./memberGroup";

export interface Alerter {
  send: (alert: Alert, group?: MemberGroup) => Promise<void>;
}