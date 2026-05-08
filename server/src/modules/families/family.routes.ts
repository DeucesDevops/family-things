import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { familyController } from './family.controller';
import { createFamilySchema, joinFamilySchema } from './family.schema';

export const familyRoutes = Router();

familyRoutes.use(asyncHandler(requireAuth));
familyRoutes.post('/', validate({ body: createFamilySchema }), asyncHandler(familyController.create));
familyRoutes.post('/join', validate({ body: joinFamilySchema }), asyncHandler(familyController.join));
familyRoutes.get('/me', asyncHandler(familyController.current));
