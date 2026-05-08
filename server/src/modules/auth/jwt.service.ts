import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import type { AccessTokenPayload } from './auth.types';

export function createAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: `${env.JWT_TTL_MINUTES}m`,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
}
