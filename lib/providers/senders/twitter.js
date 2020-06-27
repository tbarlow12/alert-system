import { BaseSender } from "./baseSender";
export class TwitterSender extends BaseSender {
    getTarget(member) {
        return member.twitter;
    }
    formatMessage(alert) {
        return JSON.stringify(alert, null, 2);
    }
    async sendMessage(message, target) {
        this.info(`Sending Twitter message to ${target}. Body: ${message}`);
    }
    async sendGroupMessage(message, targets) {
        this.info(`Sending Twitter message to ${targets.join(",")}. Body: ${message}`);
    }
}
//# sourceMappingURL=twitter.js.map