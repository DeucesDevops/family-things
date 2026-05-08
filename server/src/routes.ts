import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { eventRoutes } from './modules/events/event.routes';
import { familyRoutes } from './modules/families/family.routes';
import { healthRoutes } from './modules/health/health.routes';
import { notificationRoutes } from './modules/notifications/notification.routes';
import { reminderRoutes } from './modules/reminders/reminder.routes';
import { suggestionRoutes } from './modules/suggestions/suggestion.routes';
import { userRoutes } from './modules/users/user.routes';
import { wishRoutes } from './modules/wishes/wish.routes';

export const routes = Router();

routes.use(healthRoutes);
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/families', familyRoutes);
routes.use('/events', eventRoutes);
routes.use('/reminders', reminderRoutes);
routes.use('/suggestions', suggestionRoutes);
routes.use('/wishes', wishRoutes);
routes.use('/notifications', notificationRoutes);
