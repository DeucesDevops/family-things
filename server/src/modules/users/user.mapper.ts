import type { User } from '@prisma/client';

export function toUserResponse(user: Pick<User, 'id' | 'name' | 'email' | 'createdAt'>) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}
