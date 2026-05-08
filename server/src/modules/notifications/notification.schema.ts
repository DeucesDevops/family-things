import { NotificationChannel } from '@prisma/client';
import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(2000),
  channel: z.nativeEnum(NotificationChannel).default(NotificationChannel.IN_APP),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
