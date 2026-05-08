import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { familyService } from './family.service';

export const familyController = {
  async create(req: Request, res: Response) {
    const family = await familyService.create(req.user!.id, req.body);
    res.status(201).json(created(family));
  },

  async join(req: Request, res: Response) {
    const family = await familyService.join(req.user!.id, req.body);
    res.json(ok(family));
  },

  async current(req: Request, res: Response) {
    const family = await familyService.current(req.user!.id);
    res.json(ok(family));
  },
};
