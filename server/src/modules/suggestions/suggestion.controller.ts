import type { Request, Response } from 'express';
import { created, ok } from '../../common/responses/api-response';
import { suggestionService } from './suggestion.service';

export const suggestionController = {
  async list(req: Request, res: Response) {
    const suggestions = await suggestionService.list(req.user!.id);
    res.json(ok(suggestions));
  },

  async create(req: Request, res: Response) {
    const suggestion = await suggestionService.create(req.user!.id, req.body);
    res.status(201).json(created(suggestion));
  },

  async vote(req: Request, res: Response) {
    const suggestion = await suggestionService.vote(req.user!.id, req.params.id);
    res.json(ok(suggestion));
  },

  async updateStatus(req: Request, res: Response) {
    const suggestion = await suggestionService.updateStatus(req.user!.id, req.params.id, req.body);
    res.json(ok(suggestion));
  },
};
