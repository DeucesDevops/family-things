import { Prisma } from '@prisma/client';
import { prisma } from '../../db/prisma';
import type { CreateEventInput } from './event.schema';

export const eventInclude = Prisma.validator<Prisma.FamilyEventInclude>()({
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
});

export const eventRepository = {
  listByFamily(familyId: string) {
    return prisma.familyEvent.findMany({
      where: {
        familyId,
      },
      orderBy: {
        startsAt: 'asc',
      },
      include: eventInclude,
    });
  },

  create(input: CreateEventInput & { familyId: string; createdById: string }) {
    return prisma.familyEvent.create({
      data: {
        familyId: input.familyId,
        createdById: input.createdById,
        type: input.type,
        title: input.title.trim(),
        notes: input.notes,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      },
      include: eventInclude,
    });
  },
};
