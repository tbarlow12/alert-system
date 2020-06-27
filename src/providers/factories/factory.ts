export abstract class Factory<T> {
  
  private providers: { [key: string]: T }

  constructor() {
    this.providers = {}
  }
  
  public register(key: string, provider: T) {
    this.providers[key] = provider;
  }

  public has(key: string): boolean {
    return !!this.providers[key];
  }

  public get(key: string): T {
    if (!this.providers[key]) {
      throw new Error(`Provider ${key} not registered in factory`);
    }
    return this.providers[key];
  }
}