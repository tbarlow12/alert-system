import { BaseSender } from "./baseSender";
export class FacebookSender extends BaseSender {
    getTarget(member) {
        return member.facebook;
    }
    formatMessage(alert) {
        return JSON.stringify(alert, null, 2);
    }
    async sendMessage(message, target) {
        this.info(`Sending Facebook message to ${target}. Body: ${message}`);
    }
    async sendGroupMessage(message, targets) {
        this.info(`Sending Facebook message to ${targets.join(",")}. Body: ${message}`);
    }
}
//# sourceMappingURL=facebook.js.map