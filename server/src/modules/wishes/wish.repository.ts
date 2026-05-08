import { prisma } from '../../db/prisma';
import type { CreateWishInput } from './wish.schema';

export const wishRepository = {
  listByFamily(familyId: string) {
    return prisma.wishDraft.findMany({
      where: {
        familyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  create(input: CreateWishInput & { familyId: string; createdById: string; message: string }) {
    return prisma.wishDraft.create({
      data: {
        familyId: input.familyId,
        createdById: input.createdById,
        recipientName: input.recipientName.trim(),
        occasion: input.occasion,
        message: input.message,
      },
    });
  },
};
