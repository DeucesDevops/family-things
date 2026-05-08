import type { Request, Response } from 'express';
import client from 'prom-client';
import { getRedisClient } from '../../config/redis';
import { prisma } from '../../db/prisma';

client.collectDefaultMetrics({
  prefix: 'family_things_',
});

export const healthController = {
  health(_req: Request, res: Response) {
    res.json({
      success: true,
      data: {
        status: 'ok',
        service: 'family-things-api',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
    });
  },

  async ready(_req: Request, res: Response) {
    const checks = {
      postgres: false,
      redis: false,
    };

    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.postgres = true;
    } catch {
      checks.postgres = false;
    }

    const redis = getRedisClient();

    if (redis) {
      try {
        await redis.ping();
        checks.redis = true;
      } catch {
        checks.redis = false;
      }
    } else {
      checks.redis = true;
    }

    const ready = Object.values(checks).every(Boolean);

    res.status(ready ? 200 : 503).json({
      success: ready,
      data: {
        status: ready ? 'ready' : 'not_ready',
        checks,
      },
    });
  },

  async metrics(_req: Request, res: Response) {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
  },
};
