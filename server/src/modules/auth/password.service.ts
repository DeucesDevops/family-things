import bcrypt from 'bcryptjs';
import { env } from '../../config/env';

export const passwordService = {
  hash(password: string) {
    return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
  },

  verify(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  },
};
