import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { wishController } from './wish.controller';
import { createWishSchema } from './wish.schema';

export const wishRoutes = Router();

wishRoutes.use(asyncHandler(requireAuth));
wishRoutes.get('/', asyncHandler(wishController.list));
wishRoutes.post('/', validate({ body: createWishSchema }), asyncHandler(wishController.create));
