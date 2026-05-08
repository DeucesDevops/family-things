import { familyService } from '../families/family.service';
import { toNotificationResponse } from './notification.mapper';
import { notificationRepository } from './notification.repository';

export const notificationService = {
  createForUser: notificationRepository.createForUser,
  createForFamily: notificationRepository.createForFamily,

  async listForCurrentUser(userId: string) {
    const family = await familyService.requireCurrentFamily(userId).catch(() => null);
    const notifications = await notificationRepository.listForUserAndFamily({
      userId,
      familyId: family?.id,
    });

    return notifications.map(toNotificationResponse);
  },
};
