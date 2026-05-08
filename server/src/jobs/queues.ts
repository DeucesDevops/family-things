import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../config/env';

const queueConnection = env.REDIS_URL
  ? new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
    })
  : null;

export const reminderQueue = queueConnection
  ? new Queue('reminder-digests', {
      connection: queueConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    })
  : null;

export async function closeQueues() {
  await reminderQueue?.close();
  await queueConnection?.quit();
}
