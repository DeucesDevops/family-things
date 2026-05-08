import type { User } from '@prisma/client';

export function toAuthResponse(user: User, token: string, refreshToken?: string) {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    token,
    refreshToken,
  };
}
