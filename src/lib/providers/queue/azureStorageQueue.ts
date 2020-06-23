import { Queue, QueueProvider, Logger } from "../../models";
import { BaseService } from "../baseService";
import { QueueServiceClient, StorageSharedKeyCredential, QueueClient } from "@azure/storage-queue";

export class AzureStorageQueueProvider extends BaseService implements QueueProvider {

  private client: QueueServiceClient;

  constructor(logger: Logger) {
    super(logger);
    const accountName = "account";
    const accountKey = "accountKey";
    this.client = new QueueServiceClient(
      `https://${accountName}.queue.core.windows.net`,
      new StorageSharedKeyCredential(accountName, accountKey)
    );
  }
  
  public async getOrCreate<T>(queueName: string): Promise<Queue<T>> {
    const queueClient = this.client.getQueueClient(queueName);
    await queueClient.create();
    return new AzureStorageQueue(this.logger, queueClient);
  }
}

export class AzureStorageQueue<T> extends BaseService implements Queue<T> {

  private queueClient: QueueClient;

  constructor(logger: Logger, client: QueueClient) {
    super(logger);
    this.queueClient = client;
  }

  public async enqueue(message: T): Promise<void> {
    await this.queueClient.sendMessage(JSON.stringify(message));
  }

  public async dequeue(): Promise<T> {
    const messages = await this.queueClient.receiveMessages();
    if (messages.receivedMessageItems.length == 1) {
      const { popReceipt, messageId, messageText } = messages.receivedMessageItems[0];
      const item: T = JSON.parse(messageText);
      await this.queueClient.deleteMessage(
        messageId,
        popReceipt
      );
      return item;
    }
    
  }

  public async peek(): Promise<T> {
    const peekedMessages = await this.queueClient.peekMessages();
    if (peekedMessages.peekedMessageItems.length == 1) {
      const { messageText } = peekedMessages.peekedMessageItems[0];
      const item: T = JSON.parse(messageText);
      return item;
    }
  }
}