import pinoHttp from 'pino-http';
import { logger } from '../../config/logger';

export const requestLogger = pinoHttp({
  logger,
  customProps(req) {
    const request = req as typeof req & { requestId?: string };

    return {
      requestId: request.requestId,
    };
  },
});
