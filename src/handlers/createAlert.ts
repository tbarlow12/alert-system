import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { HandlerFactory } from '../lib/factories';
import { AlertRequest, allPlatforms, IocContainer } from '../lib/models';
import { Config } from '../lib/utils';

export const run: AzureFunction = HandlerFactory.create<HttpRequest>(
  async (context: Context, req: HttpRequest, container: IocContainer) => {
    const { logger } = container;
    logger.info("Creating alert");
    const alertRequest: AlertRequest = req.body;
    const platforms = alertRequest.platforms || allPlatforms;
    for (const platform of platforms) {
      logger.info(`Creating alert for ${platform}`);
      const queueName = Config.platformQueueName(platform);
      // TODO - create queue
      // TODO - queue up message for that platform
    }

  }
);