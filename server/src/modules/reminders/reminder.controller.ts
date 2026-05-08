import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { reminderService } from './reminder.service';

export const reminderController = {
  async list(req: Request, res: Response) {
    const reminders = await reminderService.list(req.user!.id);
    res.json(ok(reminders));
  },

  async create(req: Request, res: Response) {
    const reminder = await reminderService.create(req.user!.id, req.body);
    res.status(201).json(created(reminder));
  },

  async updateCompletion(req: Request, res: Response) {
    const reminder = await reminderService.updateCompletion(req.user!.id, req.params.id, req.body);
    res.json(ok(reminder));
  },
};
