export class BaseService {
    constructor(logger) {
        this.logger = logger;
    }
    log(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    info(message) {
        this.logger.info(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
}
//# sourceMappingURL=baseService.js.map