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
  date: Date;
  message: string;
  type: AlertType;
  urgency: AlertUrgency;
}