import { eventBus } from '../../events/event-bus';
import { familyService } from '../families/family.service';
import { toEventResponse } from './event.mapper';
import { eventRepository } from './event.repository';
import type { CreateEventInput } from './event.schema';

export const eventService = {
  async list(userId: string) {
    const family = await familyService.requireCurrentFamily(userId);
    const events = await eventRepository.listByFamily(family.id);
    return events.map(toEventResponse);
  },

  async create(userId: string, input: CreateEventInput) {
    const family = await familyService.requireCurrentFamily(userId);
    const event = await eventRepository.create({
      ...input,
      familyId: family.id,
      createdById: userId,
    });

    eventBus.emit('event.created', {
      eventId: event.id,
      familyId: family.id,
      createdById: userId,
    });

    return toEventResponse(event);
  },
};
