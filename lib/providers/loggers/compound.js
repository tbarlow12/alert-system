export class CompoundLogger {
    constructor(loggers) {
        this.loggers = loggers || [];
    }
    addLogger(logger) {
        this.loggers.push(logger);
    }
    debug(message) {
        this.loggers.forEach((logger) => logger.debug(message));
    }
    info(message) {
        this.loggers.forEach((logger) => logger.info(message));
    }
    warn(message) {
        this.loggers.forEach((logger) => logger.warn(message));
    }
    error(message) {
        this.loggers.forEach((logger) => logger.error(message));
    }
}
//# sourceMappingURL=compound.js.map