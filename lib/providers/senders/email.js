import { BaseSender } from "./baseSender";
export class EmailSender extends BaseSender {
    getTarget(member) {
        return member.email;
    }
    formatMessage(alert) {
        return JSON.stringify(alert, null, 2);
    }
    async sendMessage(message, emailAddress) {
        this.info(`Sending email to ${emailAddress}. Body: ${message}`);
    }
    async sendGroupMessage(message, emailAddresses) {
        this.info(`Sending email to ${emailAddresses.join(",")}. Body: ${message}`);
    }
}
//# sourceMappingURL=email.js.map