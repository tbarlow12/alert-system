import { BaseSender } from "./baseSender";
export class SmsSender extends BaseSender {
    constructor(logger) {
        super(logger);
    }
    getTarget(member) {
        return member.phone;
    }
    formatMessage(alert) {
        return alert.message
            .replace(/\\n+/g, " ");
    }
    async sendMessage(message, target) {
        this.info(`Sending SMS message to ${target}. Body: ${message}`);
    }
    async sendGroupMessage(message, targets) {
        return await Promise.all(targets.map(target => this.sendMessage(message, target)));
    }
}
//# sourceMappingURL=sms.js.map