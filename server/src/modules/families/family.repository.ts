import { FamilyRole, Prisma } from '@prisma/client';
import { prisma } from '../../db/prisma';

export const familyInclude = Prisma.validator<Prisma.FamilyInclude>()({
  members: {
    orderBy: {
      joinedAt: 'asc',
    },
    include: {
      user: true,
    },
  },
});

const defaultSuggestionSeeds = [
  {
    title: 'Greenwich picnic trail',
    category: 'Outing',
    meta: 'Low cost · 42 min · Clear weather',
    rationale: 'Dry weather, short travel, and a low-cost weekend preference make this a good first plan.',
  },
  {
    title: 'Family movie night',
    category: 'Tonight',
    meta: 'At home · Snacks needed · Family pick',
    rationale: 'Good for a quiet evening when travel energy is low.',
  },
  {
    title: 'Sunday roast booking',
    category: 'Meal',
    meta: 'Family-friendly · 12:30 slot open',
    rationale: 'Works for mixed ages and keeps Sunday planning simple.',
  },
];

export const familyRepository = {
  existsByInviteCode(inviteCode: string) {
    return prisma.family.findUnique({
      where: {
        inviteCode,
      },
      select: {
        id: true,
      },
    });
  },

  findByInviteCode(inviteCode: string) {
    return prisma.family.findUnique({
      where: {
        inviteCode,
      },
      include: familyInclude,
    });
  },

  async findCurrentForUser(userId: string) {
    const membership = await prisma.familyMember.findFirst({
      where: {
        userId,
      },
      orderBy: {
        joinedAt: 'asc',
      },
      include: {
        family: {
          include: familyInclude,
        },
      },
    });

    return membership?.family ?? null;
  },

  createWithAdmin(input: { name: string; inviteCode: string; userId: string }) {
    return prisma.family.create({
      data: {
        name: input.name,
        inviteCode: input.inviteCode,
        members: {
          create: {
            userId: input.userId,
            role: FamilyRole.ADMIN,
          },
        },
        suggestions: {
          createMany: {
            data: defaultSuggestionSeeds,
          },
        },
      },
      include: familyInclude,
    });
  },

  async addMember(input: { familyId: string; userId: string; role?: FamilyRole }) {
    await prisma.familyMember.upsert({
      where: {
        familyId_userId: {
          familyId: input.familyId,
          userId: input.userId,
        },
      },
      create: {
        familyId: input.familyId,
        userId: input.userId,
        role: input.role ?? FamilyRole.MEMBER,
      },
      update: {},
    });

    return prisma.family.findUniqueOrThrow({
      where: {
        id: input.familyId,
      },
      include: familyInclude,
    });
  },
};
