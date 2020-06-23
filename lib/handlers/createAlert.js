import { HandlerFactory } from '../lib/factories';
import { allPlatforms } from '../lib/models';
import { Config } from '../lib/utils';
export const run = HandlerFactory.create(async (context, req, container) => {
    const { logger } = container;
    logger.info("Creating alert");
    const alertRequest = req.body;
    const platforms = alertRequest.platforms || allPlatforms;
    for (const platform of platforms) {
        logger.info(`Creating alert for ${platform}`);
        const queueName = Config.platformQueueName(platform);
    }
});
//# sourceMappingURL=createAlert.js.map