import { prisma } from '../../db/prisma';
import type { CreateReminderInput } from './reminder.schema';

export const reminderRepository = {
  listByFamily(familyId: string) {
    return prisma.reminder.findMany({
      where: {
        familyId,
      },
      orderBy: {
        dueAt: 'asc',
      },
    });
  },

  create(input: CreateReminderInput & { familyId: string; createdById: string }) {
    return prisma.reminder.create({
      data: {
        familyId: input.familyId,
        createdById: input.createdById,
        type: input.type,
        title: input.title.trim(),
        dueAt: input.dueAt,
      },
    });
  },

  async updateCompletion(input: { id: string; familyId: string; completed: boolean }) {
    const result = await prisma.reminder.updateMany({
      where: {
        id: input.id,
        familyId: input.familyId,
      },
      data: {
        completed: input.completed,
      },
    });

    if (result.count === 0) {
      return null;
    }

    return prisma.reminder.findUnique({
      where: {
        id: input.id,
      },
    });
  },
};
