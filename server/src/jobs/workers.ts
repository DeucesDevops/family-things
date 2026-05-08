import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { notificationService } from '../modules/notifications/notification.service';

const workers: Worker[] = [];

export function startWorkers() {
  if (!env.REDIS_URL) {
    logger.info('Workers requested but Redis is not configured');
    return;
  }

  const connection = new IORedis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

  const reminderWorker = new Worker(
    'reminder-digests',
    async (job) => {
      await notificationService.createForFamily({
        familyId: job.data.familyId,
        title: 'Reminder digest',
        message: job.data.message ?? 'You have upcoming family reminders.',
      });
    },
    { connection },
  );

  reminderWorker.on('failed', (job, error) => {
    logger.error({ jobId: job?.id, error }, 'Reminder digest job failed');
  });

  workers.push(reminderWorker);
  logger.info('Background workers started');
}

export async function stopWorkers() {
  await Promise.all(workers.map((worker) => worker.close()));
}
