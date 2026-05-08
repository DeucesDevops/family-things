import type { Request, Response } from 'express';
import { ok } from '../../common/responses/api-response';
import { userService } from './user.service';

export const userController = {
  async me(req: Request, res: Response) {
    const user = await userService.getMe(req.user!.id);
    res.json(ok(user));
  },

  async updateMe(req: Request, res: Response) {
    const user = await userService.updateMe(req.user!.id, req.body);
    res.json(ok(user));
  },
};
