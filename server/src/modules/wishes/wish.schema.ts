import { z } from 'zod';

export const createWishSchema = z.object({
  recipientName: z.string().trim().min(1).max(120),
  occasion: z.string().trim().min(1).max(120).optional(),
  tone: z.string().trim().min(1).max(80).optional(),
  message: z.string().trim().min(1).max(2000).optional(),
});

export type CreateWishInput = z.infer<typeof createWishSchema>;
