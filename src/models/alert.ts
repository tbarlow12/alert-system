import { Member } from "./member";
import { MemberGroup } from "./memberGroup";

export enum AlertType {
  DANGER,
  PARTY,
  FREE_FOOD,
}

export enum AlertUrgency {
  LOW,
  MED,
  HIGH,
}

export interface Alert {
  from: Member;
  date: Date;
  message: string;
  type: AlertType;
  urgency: AlertUrgency;
  target: Member|MemberGroup;
}