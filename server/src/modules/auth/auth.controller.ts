import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { authService } from './auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    res.status(201).json(created(result));
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    res.json(ok(result));
  },

  async logout(req: Request, res: Response) {
    await authService.logout(req.body?.refreshToken);
    res.status(204).send();
  },
};
