import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { notificationController } from './notification.controller';

export const notificationRoutes = Router();

notificationRoutes.use(asyncHandler(requireAuth));
notificationRoutes.get('/', asyncHandler(notificationController.list));
