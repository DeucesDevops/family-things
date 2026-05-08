import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { verifyAccessToken } from '../../modules/auth/jwt.service';
import { userRepository } from '../../modules/users/user.repository';

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.header('authorization');

    if (!header?.startsWith('Bearer ')) {
      throw ApiError.unauthorized();
    }

    const token = header.slice('Bearer '.length);
    const payload = verifyAccessToken(token);
    const user = await userRepository.findById(payload.sub);

    if (!user) {
      throw ApiError.unauthorized('User account no longer exists');
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error instanceof ApiError ? error : ApiError.unauthorized('Invalid or expired token'));
  }
}
