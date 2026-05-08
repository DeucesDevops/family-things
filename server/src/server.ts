import http from 'node:http';
import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectRedis, disconnectRedis } from './config/redis';
import { connectDatabase, disconnectDatabase } from './db/prisma';
import { registerEventHandlers } from './events/handlers';
import { startWorkers, stopWorkers } from './jobs/workers';

async function bootstrap() {
  await connectDatabase();

  try {
    await connectRedis();
  } catch (error) {
    logger.warn({ error }, 'Redis unavailable; continuing without queue workers');
  }

  registerEventHandlers();

  if (env.ENABLE_WORKERS) {
    startWorkers();
  }

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'Family Things API listening');
  });

  const shutdown = async (signal: NodeJS.Signals) => {
    logger.info({ signal }, 'Shutting down Family Things API');
    server.close(async () => {
      await stopWorkers();
      await disconnectRedis();
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  logger.fatal({ error }, 'Failed to start Family Things API');
  process.exit(1);
});
