import { Queue } from "./queue";

export interface QueueProvider {
  getOrCreate<T>(queueName: string): Promise<Queue<T>>;
}