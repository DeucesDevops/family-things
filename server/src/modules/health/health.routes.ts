import { Router } from 'express';
import { asyncHandler } from '../../common/utils/async-handler';
import { healthController } from './health.controller';

export const healthRoutes = Router();

healthRoutes.get('/health', healthController.health);
healthRoutes.get('/ready', asyncHandler(healthController.ready));
healthRoutes.get('/metrics', asyncHandler(healthController.metrics));
