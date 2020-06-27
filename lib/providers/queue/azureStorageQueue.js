import { BaseService } from "../baseService";
import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
export class AzureStorageQueueProvider extends BaseService {
    constructor(logger) {
        super(logger);
        const accountName = "account";
        const accountKey = "accountKey";
        this.client = new QueueServiceClient(`https://${accountName}.queue.core.windows.net`, new StorageSharedKeyCredential(accountName, accountKey));
    }
    async getOrCreate(queueName) {
        const queueClient = this.client.getQueueClient(queueName);
        await queueClient.create();
        return new AzureStorageQueue(this.logger, queueClient);
    }
}
export class AzureStorageQueue extends BaseService {
    constructor(logger, client) {
        super(logger);
        this.queueClient = client;
    }
    async enqueue(message) {
        await this.queueClient.sendMessage(JSON.stringify(message));
    }
    async dequeue() {
        const messages = await this.queueClient.receiveMessages();
        if (messages.receivedMessageItems.length == 1) {
            const { popReceipt, messageId, messageText } = messages.receivedMessageItems[0];
            const item = JSON.parse(messageText);
            await this.queueClient.deleteMessage(messageId, popReceipt);
            return item;
        }
    }
    async peek() {
        const peekedMessages = await this.queueClient.peekMessages();
        if (peekedMessages.peekedMessageItems.length == 1) {
            const { messageText } = peekedMessages.peekedMessageItems[0];
            const item = JSON.parse(messageText);
            return item;
        }
    }
}
//# sourceMappingURL=azureStorageQueue.js.map