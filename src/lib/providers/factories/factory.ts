export abstract class Factory<TKey extends string, TProvider> {
  
  private providers: { [key: string]: TProvider }

  constructor() {
    this.providers = {}
  }
  
  public register(key: TKey, provider: TProvider) {
    this.providers[key] = provider;
  }

  public has(key: string): boolean {
    return !!this.providers[key];
  }

  public get(key: TKey): TProvider {
    if (!this.providers[key]) {
      throw new Error(`Provider ${key} not registered in factory`);
    }
    return this.providers[key];
  }
}