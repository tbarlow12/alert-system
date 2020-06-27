export class Factory {
    constructor() {
        this.providers = {};
    }
    register(key, provider) {
        this.providers[key] = provider;
    }
    has(key) {
        return !!this.providers[key];
    }
    get(key) {
        if (!this.providers[key]) {
            throw new Error(`Provider ${key} not registered in factory`);
        }
        return this.providers[key];
    }
}
//# sourceMappingURL=factory.js.map