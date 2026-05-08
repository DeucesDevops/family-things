import { prisma } from '../../db/prisma';

export const userRepository = {
  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  existsByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },

  create(input: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({
      data: input,
    });
  },

  update(id: string, input: { name?: string; email?: string }) {
    return prisma.user.update({
      where: { id },
      data: input,
    });
  },
};
