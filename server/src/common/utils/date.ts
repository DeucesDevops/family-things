import { z } from 'zod';

export const dateString = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Expected a valid date string',
  })
  .transform((value) => new Date(value));
