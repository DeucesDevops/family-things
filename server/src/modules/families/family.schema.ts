import { z } from 'zod';

export const createFamilySchema = z.object({
  name: z.string().trim().min(1).max(120),
});

export const joinFamilySchema = z.object({
  inviteCode: z.string().trim().min(4).max(16),
});

export type CreateFamilyInput = z.infer<typeof createFamilySchema>;
export type JoinFamilyInput = z.infer<typeof joinFamilySchema>;
