import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { idParamsSchema } from '../../common/utils/id.schema';
import { reminderController } from './reminder.controller';
import { completeReminderSchema, createReminderSchema } from './reminder.schema';

export const reminderRoutes = Router();

reminderRoutes.use(asyncHandler(requireAuth));
reminderRoutes.get('/', asyncHandler(reminderController.list));
reminderRoutes.post('/', validate({ body: createReminderSchema }), asyncHandler(reminderController.create));
reminderRoutes.patch(
  '/:id/complete',
  validate({ params: idParamsSchema, body: completeReminderSchema }),
  asyncHandler(reminderController.updateCompletion),
);
