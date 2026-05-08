import { logger } from '../../config/logger';

type PushMessage = {
  token: string;
  title: string;
  body: string;
};

export const pushClient = {
  async send(message: PushMessage) {
    logger.info(
      {
        token: message.token.slice(0, 8),
        title: message.title,
      },
      'Push notification send requested',
    );

    return {
      provider: 'local-log',
      messageId: `push_${Date.now()}`,
    };
  },
};
