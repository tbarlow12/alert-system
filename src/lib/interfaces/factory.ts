export interface Factory<T> {
  register: (key: string, provider: T) => void;
  get: (key: string) => T;
}