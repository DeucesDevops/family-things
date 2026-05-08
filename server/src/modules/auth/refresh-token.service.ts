import crypto from 'node:crypto';
import { prisma } from '../../db/prisma';

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const refreshTokenService = {
  async issue(userId: string) {
    const token = crypto.randomBytes(48).toString('base64url');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashToken(token),
        expiresAt,
      },
    });

    return token;
  },

  revoke(token: string) {
    return prisma.refreshToken.updateMany({
      where: {
        tokenHash: hashToken(token),
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  },
};
