import { Alert } from "./alert";
import { MemberGroup } from "./memberGroup";
import { Member } from "./member";

export interface Alerter {
  alertGroup: (alert: Alert, group: MemberGroup) => Promise<void>;
  alertMember: (alert: Alert, member: Member) => Promise<void>;
  alertAll: (alert: Alert) => Promise<void>;
}