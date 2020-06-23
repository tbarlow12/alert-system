export class AzureFunctionsLogger {
    constructor(context) {
        this.logger = context.log;
    }
    debug(message) {
        this.logger.verbose(message);
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
//# sourceMappingURL=azureFunctions.js.map