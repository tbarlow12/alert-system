import { allPlatforms } from '../lib/models';
import { HandlerFactory } from '../lib/providers/factories';
import { Config } from '../lib/utils';
export const run = HandlerFactory.create(async (_context, req, serviceCollection) => {
    const { logger, queueProviderFactory } = serviceCollection;
    const queueProvider = queueProviderFactory.get(Config.queueType());
    logger.info("Creating alert");
    const alertRequest = req.body;
    const platforms = alertRequest.platforms || allPlatforms;
    for (const platform of platforms) {
        logger.info(`Creating alert for ${platform}`);
        const queueName = Config.platformQueueName(platform);
        const queue = await queueProvider.getOrCreate(queueName);
        await queue.enqueue(alertRequest.alert);
    }
});
//# sourceMappingURL=createAlert.js.map