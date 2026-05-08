import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { eventService } from './event.service';

export const eventController = {
  async list(req: Request, res: Response) {
    const events = await eventService.list(req.user!.id);
    res.json(ok(events));
  },

  async create(req: Request, res: Response) {
    const event = await eventService.create(req.user!.id, req.body);
    res.status(201).json(created(event));
  },
};
