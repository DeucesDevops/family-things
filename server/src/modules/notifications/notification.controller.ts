import type { Request, Response } from 'express';
import { ok } from '../../common/responses/api-response';
import { notificationService } from './notification.service';

export const notificationController = {
  async list(req: Request, res: Response) {
    const notifications = await notificationService.listForCurrentUser(req.user!.id);
    res.json(ok(notifications));
  },
};
