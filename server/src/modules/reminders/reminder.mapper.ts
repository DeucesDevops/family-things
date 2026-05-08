import type { Reminder } from '@prisma/client';

export function toReminderResponse(reminder: Reminder) {
  return {
    id: reminder.id,
    type: reminder.type,
    title: reminder.title,
    dueAt: reminder.dueAt,
    completed: reminder.completed,
    createdAt: reminder.createdAt,
  };
}
