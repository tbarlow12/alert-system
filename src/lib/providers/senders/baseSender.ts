import { Sender } from "../../interfaces/sender";
import { Alert } from "../../interfaces/alert";
import { Member } from "../../interfaces/member"
import { MemberGroup } from "../../interfaces/memberGroup";
import { Logger } from "../../interfaces/logger";

export abstract class BaseSender implements Sender {

  private logger: Logger;

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
  protected abstract sendGroupMessage(message: string, targets: string[]): Promise<void>;
  protected abstract getTarget(member: Member): string;
}