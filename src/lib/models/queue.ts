export interface Queue<T> {
  enqueue: (message: T) => Promise<void>;
  dequeue: () => Promise<T>;
  peek: () => Promise<T>;
}