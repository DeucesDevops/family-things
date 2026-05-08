import { EventType } from '@prisma/client';
import { z } from 'zod';
import { dateString } from '../../common/utils/date';

export const createEventSchema = z.object({
  type: z.nativeEnum(EventType).default(EventType.OUTING),
  title: z.string().trim().min(1).max(160),
  notes: z.string().trim().max(2000).optional(),
  startsAt: dateString,
  endsAt: dateString.optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
