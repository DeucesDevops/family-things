import type { Notification } from '@prisma/client';

export function toNotificationResponse(notification: Notification) {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.message,
    channel: notification.channel,
    status: notification.status,
    sentAt: notification.sentAt,
    createdAt: notification.createdAt,
  };
}
