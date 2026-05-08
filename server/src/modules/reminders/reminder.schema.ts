import { ReminderType } from '@prisma/client';
import { z } from 'zod';
import { dateString } from '../../common/utils/date';

export const createReminderSchema = z.object({
  type: z.nativeEnum(ReminderType).default(ReminderType.CUSTOM),
  title: z.string().trim().min(1).max(160),
  dueAt: dateString,
});

export const completeReminderSchema = z.object({
  completed: z.boolean().default(true),
});

export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export type CompleteReminderInput = z.infer<typeof completeReminderSchema>;
