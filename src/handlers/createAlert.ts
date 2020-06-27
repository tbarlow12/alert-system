import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Alert, AlertRequest, allPlatforms, ServiceCollection } from '../models';
import { HandlerFactory } from '../providers/factories';
import { Config } from '../utils';

export const run: AzureFunction = HandlerFactory.create<HttpRequest>(
  async (_context: Context, req: HttpRequest, serviceCollection: ServiceCollection) => {
    const { logger, queueProviderFactory } = serviceCollection;
    const queueProvider = queueProviderFactory.get(Config.queueType());
    logger.info("Creating alert");
    const alertRequest: AlertRequest = req.body;
    const platforms = alertRequest.platforms || allPlatforms;
    for (const platform of platforms) {
      logger.info(`Creating alert for ${platform}`);
      const queueName = Config.platformQueueName(platform);
      const queue = await queueProvider.getOrCreate<Alert>(queueName);
      await queue.enqueue(alertRequest.alert);
    }
  }
);