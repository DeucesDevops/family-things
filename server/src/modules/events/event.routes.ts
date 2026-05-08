import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { eventController } from './event.controller';
import { createEventSchema } from './event.schema';

export const eventRoutes = Router();

eventRoutes.use(asyncHandler(requireAuth));
eventRoutes.get('/', asyncHandler(eventController.list));
eventRoutes.post('/', validate({ body: createEventSchema }), asyncHandler(eventController.create));
