import { winstonLogger } from '@datz0512/freelancer-shared';
import { config } from '@gig/config';
import { createClient } from 'redis';
import { Logger } from 'winston';

type RedisClient = ReturnType<typeof createClient>;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gigRedisConnection', 'debug');
const client: RedisClient = createClient({ url: `${config.REDIS_HOST}` });

const redisConnect = async (): Promise<void> => {
  try {
    await client.connect();
    log.info(`GigService Redis connection: ${await client.ping()}`);
    cacheError();
  } catch (error) {
    log.log('error', 'GigService redisConnect() method error:', error);
  }
};

const cacheError = (): void => {
  client.on('error', (error: unknown) => {
    log.error(error);
  });
};

export { redisConnect, client };
