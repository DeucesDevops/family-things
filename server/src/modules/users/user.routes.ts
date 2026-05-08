import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { updateMeSchema } from './user.schema';
import { userController } from './user.controller';

export const userRoutes = Router();

userRoutes.use(asyncHandler(requireAuth));
userRoutes.get('/me', asyncHandler(userController.me));
userRoutes.patch('/me', validate({ body: updateMeSchema }), asyncHandler(userController.updateMe));
