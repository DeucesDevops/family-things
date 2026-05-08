import { NotificationChannel, NotificationStatus } from '@prisma/client';
import { prisma } from '../../db/prisma';

export const notificationRepository = {
  createForUser(input: { userId: string; title: string; message: string; channel?: NotificationChannel }) {
    return prisma.notification.create({
      data: {
        userId: input.userId,
        title: input.title,
        message: input.message,
        channel: input.channel ?? NotificationChannel.IN_APP,
        status: NotificationStatus.QUEUED,
      },
    });
  },

  createForFamily(input: { familyId: string; title: string; message: string; channel?: NotificationChannel }) {
    return prisma.notification.create({
      data: {
        familyId: input.familyId,
        title: input.title,
        message: input.message,
        channel: input.channel ?? NotificationChannel.IN_APP,
        status: NotificationStatus.QUEUED,
      },
    });
  },

  listForUserAndFamily(input: { userId: string; familyId?: string }) {
    return prisma.notification.findMany({
      where: {
        OR: [{ userId: input.userId }, input.familyId ? { familyId: input.familyId } : { familyId: null }],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
  },
};
