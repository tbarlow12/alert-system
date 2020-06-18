import { Sender, Alert, MemberGroup, Member, Logger } from "../../models";

export abstract class BaseSender implements Sender {

  protected logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async sendAlert(alert: Alert) {
    const message = this.formatMessage(alert);
    if ((alert.target as any).members) {
      const group: MemberGroup = alert.target as MemberGroup;
      this.logger.info(`Sending alert to group ${group.id} using sender ${this.constructor.name}`);
      const targets = group.members.map(member => this.getTarget(member));
      await this.sendGroupMessage(message, targets);
    } else {
      const member: Member = alert.target as Member;
      this.logger.info(`Sending alert to member ${member.id} using sender ${this.constructor.name}`);
      await this.sendMessage(message, this.getTarget(member));
    }
  }

  protected abstract formatMessage(alert: Alert): string;
  protected abstract sendMessage(message: string, target: string): Promise<void>;
  protected abstract sendGroupMessage(message: string, targets: string[]): Promise<void|void[]>;
  protected abstract getTarget(member: Member): string;
}