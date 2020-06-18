
export class Factory<T> {
  
  private providers: { [key: string]: T }

  constructor() {
    this.providers = {}
  }
  
  public register(key: string, provider: T) {
    this.providers[key] = provider;
  }

  public get(key: string): T {
    if (!this.providers[key]) {
      throw new Error(`Provider ${key} not registered in factory`);
    }
    return this.providers[key];
  }
}