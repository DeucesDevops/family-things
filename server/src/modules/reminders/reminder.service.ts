import { ApiError } from '../../common/errors/ApiError';
import { eventBus } from '../../events/event-bus';
import { familyService } from '../families/family.service';
import { toReminderResponse } from './reminder.mapper';
import { reminderRepository } from './reminder.repository';
import type { CompleteReminderInput, CreateReminderInput } from './reminder.schema';

export const reminderService = {
  async list(userId: string) {
    const family = await familyService.requireCurrentFamily(userId);
    const reminders = await reminderRepository.listByFamily(family.id);
    return reminders.map(toReminderResponse);
  },

  async create(userId: string, input: CreateReminderInput) {
    const family = await familyService.requireCurrentFamily(userId);
    const reminder = await reminderRepository.create({
      ...input,
      familyId: family.id,
      createdById: userId,
    });

    eventBus.emit('reminder.created', {
      reminderId: reminder.id,
      familyId: family.id,
      dueAt: reminder.dueAt,
    });

    return toReminderResponse(reminder);
  },

  async updateCompletion(userId: string, reminderId: string, input: CompleteReminderInput) {
    const family = await familyService.requireCurrentFamily(userId);

    try {
      const reminder = await reminderRepository.updateCompletion({
        id: reminderId,
        familyId: family.id,
        completed: input.completed,
      });

      if (!reminder) {
        throw ApiError.notFound('Reminder not found');
      }

      return toReminderResponse(reminder);
    } catch {
      throw ApiError.notFound('Reminder not found');
    }
  },
};
