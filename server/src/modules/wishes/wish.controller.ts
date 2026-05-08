import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { wishService } from './wish.service';

export const wishController = {
  async list(req: Request, res: Response) {
    const wishes = await wishService.list(req.user!.id);
    res.json(ok(wishes));
  },

  async create(req: Request, res: Response) {
    const wish = await wishService.create(req.user!.id, req.body);
    res.status(201).json(created(wish));
  },
};
