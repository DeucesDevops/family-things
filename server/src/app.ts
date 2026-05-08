import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './common/errors/error-handler';
import { notFoundHandler } from './common/errors/not-found-handler';
import { apiRateLimiter } from './common/middleware/rate-limit.middleware';
import { requestContext } from './common/middleware/request-context.middleware';
import { requestLogger } from './common/middleware/request-logger.middleware';
import { corsOptions } from './config/cors';
import { openApiDocument } from './docs/openapi';
import { healthRoutes } from './modules/health/health.routes';
import { routes } from './routes';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(requestContext);
  app.use(requestLogger);
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(apiRateLimiter);

  app.use('/', healthRoutes);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use('/api', routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
