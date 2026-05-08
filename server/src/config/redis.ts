import IORedis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

let redis: IORedis | null = null;

export function getRedisClient() {
  if (!env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    redis = new IORedis(env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    redis.on('error', (error) => {
      logger.warn({ error }, 'Redis connection error');
    });
  }

  return redis;
}

export async function connectRedis() {
  const client = getRedisClient();

  if (!client) {
    logger.info('Redis URL not configured; background queues are disabled');
    return;
  }

  if (client.status === 'end' || client.status === 'wait') {
    await client.connect();
  }

  await client.ping();
  logger.info('Redis connected');
}

export async function disconnectRedis() {
  if (redis && redis.status !== 'end') {
    await redis.quit();
  }
}
