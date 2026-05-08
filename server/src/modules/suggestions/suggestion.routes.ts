import { Router } from 'express';
import { requireAuth } from '../../common/middleware/auth.middleware';
import { validate } from '../../common/middleware/validate.middleware';
import { asyncHandler } from '../../common/utils/async-handler';
import { idParamsSchema } from '../../common/utils/id.schema';
import { suggestionController } from './suggestion.controller';
import { createSuggestionSchema, updateSuggestionStatusSchema } from './suggestion.schema';

export const suggestionRoutes = Router();

suggestionRoutes.use(asyncHandler(requireAuth));
suggestionRoutes.get('/', asyncHandler(suggestionController.list));
suggestionRoutes.post('/', validate({ body: createSuggestionSchema }), asyncHandler(suggestionController.create));
suggestionRoutes.post('/:id/vote', validate({ params: idParamsSchema }), asyncHandler(suggestionController.vote));
suggestionRoutes.patch(
  '/:id/status',
  validate({ params: idParamsSchema, body: updateSuggestionStatusSchema }),
  asyncHandler(suggestionController.updateStatus),
);
