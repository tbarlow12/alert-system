import { Alert, Member, MemberGroup, Sender } from "../../models";
import { BaseService } from "../baseService";

export abstract class BaseSender extends BaseService implements Sender {

  public async sendAlert(alert: Alert) {
    const message = this.formatMessage(alert);
    if ("members" in alert.target) {
      const group: MemberGroup = alert.target as MemberGroup;
      this.info(`Sending alert to group ${group.id} using sender ${this.constructor.name}`);
      const targets = await Promise.all(group.members.map(async memberId => {
        const member = await this.storage.getMember(memberId);
        return this.getTarget(member)
      }));
      await this.sendGroupMessage(message, targets);
    } else {
      const member: Member = alert.target as Member;
      this.info(`Sending alert to member ${member.id} using sender ${this.constructor.name}`);
      await this.sendMessage(message, this.getTarget(member));
    }
  }

  protected abstract formatMessage(alert: Alert): string;
  protected abstract sendMessage(message: string, target: string): Promise<void>;
  protected abstract sendGroupMessage(message: string, targets: string[]): Promise<void|void[]>;
  protected abstract getTarget(member: Member): string;
}