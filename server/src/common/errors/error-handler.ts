import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { logger } from '../../config/logger';
import { ApiError } from './ApiError';

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: error.flatten(),
      },
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = error.code === 'P2002' ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      error: {
        code: `PRISMA_${error.code}`,
        message: error.code === 'P2002' ? 'A record with these details already exists' : 'Database request failed',
        details: error.meta,
      },
    });
    return;
  }

  logger.error({ error, path: req.path, requestId: req.requestId }, 'Unhandled request error');

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    },
  });
}
