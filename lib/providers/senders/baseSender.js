import { BaseService } from "../baseService";
export class BaseSender extends BaseService {
    async sendAlert(alert) {
        const message = this.formatMessage(alert);
        if ("members" in alert.target) {
            const group = alert.target;
            this.info(`Sending alert to group ${group.id} using sender ${this.constructor.name}`);
            const targets = group.members.map(member => this.getTarget(member));
            await this.sendGroupMessage(message, targets);
        }
        else {
            const member = alert.target;
            this.info(`Sending alert to member ${member.id} using sender ${this.constructor.name}`);
            await this.sendMessage(message, this.getTarget(member));
        }
    }
}
//# sourceMappingURL=baseSender.js.map