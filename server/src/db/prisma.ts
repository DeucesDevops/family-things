import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const prisma = new PrismaClient({
  log: env.isProduction
    ? ['warn', 'error']
    : [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
});

if (!env.isProduction) {
  prisma.$on('warn', (event) => logger.warn(event, 'Prisma warning'));
  prisma.$on('error', (event) => logger.error(event, 'Prisma error'));
}

export async function connectDatabase() {
  await prisma.$connect();
  logger.info('PostgreSQL connected');
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}
