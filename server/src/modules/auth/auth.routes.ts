import { Router } from 'express';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { authController } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

export const authRoutes = Router();

authRoutes.post('/register', validate({ body: registerSchema }), asyncHandler(authController.register));
authRoutes.post('/login', validate({ body: loginSchema }), asyncHandler(authController.login));
authRoutes.post('/logout', asyncHandler(authController.logout));
