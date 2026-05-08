import { z } from 'zod';

export const updateMeSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().email().optional(),
});

export type UpdateMeInput = z.infer<typeof updateMeSchema>;
