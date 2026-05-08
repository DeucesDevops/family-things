import { prisma } from '../../db/prisma';
import type { CreateSuggestionInput, UpdateSuggestionStatusInput } from './suggestion.schema';

export const suggestionRepository = {
  listByFamily(familyId: string) {
    return prisma.suggestion.findMany({
      where: {
        familyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  findInFamily(input: { id: string; familyId: string }) {
    return prisma.suggestion.findFirst({
      where: {
        id: input.id,
        familyId: input.familyId,
      },
    });
  },

  create(input: CreateSuggestionInput & { familyId: string }) {
    return prisma.suggestion.create({
      data: {
        familyId: input.familyId,
        title: input.title.trim(),
        category: input.category.trim(),
        meta: input.meta.trim(),
        rationale: input.rationale,
      },
    });
  },

  async updateStatus(input: UpdateSuggestionStatusInput & { id: string; familyId: string }) {
    const result = await prisma.suggestion.updateMany({
      where: {
        id: input.id,
        familyId: input.familyId,
      },
      data: {
        status: input.status,
      },
    });

    if (result.count === 0) {
      return null;
    }

    return prisma.suggestion.findUnique({
      where: {
        id: input.id,
      },
    });
  },

  upsertVote(input: { suggestionId: string; userId: string; positive?: boolean }) {
    return prisma.vote.upsert({
      where: {
        suggestionId_userId: {
          suggestionId: input.suggestionId,
          userId: input.userId,
        },
      },
      create: {
        suggestionId: input.suggestionId,
        userId: input.userId,
        positive: input.positive ?? true,
      },
      update: {
        positive: input.positive ?? true,
      },
    });
  },

  countPositiveVotes(suggestionId: string) {
    return prisma.vote.count({
      where: {
        suggestionId,
        positive: true,
      },
    });
  },
};
