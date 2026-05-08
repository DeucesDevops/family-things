import { logger } from '../../config/logger';

type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export const emailClient = {
  async send(message: EmailMessage) {
    logger.info(
      {
        to: message.to,
        subject: message.subject,
      },
      'Email send requested',
    );

    return {
      provider: 'local-log',
      messageId: `email_${Date.now()}`,
    };
  },
};
