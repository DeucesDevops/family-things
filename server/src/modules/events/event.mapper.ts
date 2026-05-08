import type { Prisma } from '@prisma/client';
import { eventInclude } from './event.repository';

export type EventWithCreator = Prisma.FamilyEventGetPayload<{
  include: typeof eventInclude;
}>;

export function toEventResponse(event: EventWithCreator) {
  return {
    id: event.id,
    type: event.type,
    title: event.title,
    notes: event.notes,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    createdBy: event.createdBy.name,
    createdAt: event.createdAt,
  };
}
