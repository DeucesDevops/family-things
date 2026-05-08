import { SuggestionStatus } from '@prisma/client';
import { z } from 'zod';

export const createSuggestionSchema = z.object({
  title: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(80),
  meta: z.string().trim().min(1).max(160),
  rationale: z.string().trim().max(2000).optional(),
});

export const updateSuggestionStatusSchema = z.object({
  status: z.nativeEnum(SuggestionStatus),
});

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>;
export type UpdateSuggestionStatusInput = z.infer<typeof updateSuggestionStatusSchema>;
