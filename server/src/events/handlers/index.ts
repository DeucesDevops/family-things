import { logger } from '../../config/logger';
import { notificationService } from '../../modules/notifications/notification.service';
import { eventBus } from '../event-bus';

let registered = false;

export function registerEventHandlers() {
  if (registered) {
    return;
  }

  registered = true;

  eventBus.on('user.registered', async ({ userId, name }) => {
    await notificationService.createForUser({
      userId,
      title: `Welcome, ${name}`,
      message: 'Your Family Things account is ready.',
    });
  });

  eventBus.on('family.created', async ({ familyId }) => {
    await notificationService.createForFamily({
      familyId,
      title: 'Family created',
      message: 'Invite code is ready to share with your household.',
    });
  });

  eventBus.on('event.created', async ({ familyId }) => {
    await notificationService.createForFamily({
      familyId,
      title: 'New family event',
      message: 'A new shared event has been added to the calendar.',
    });
  });

  eventBus.on('reminder.created', async ({ familyId, dueAt }) => {
    await notificationService.createForFamily({
      familyId,
      title: 'New reminder',
      message: `A reminder was scheduled for ${dueAt.toISOString()}.`,
    });
  });

  logger.info('Domain event handlers registered');
}
