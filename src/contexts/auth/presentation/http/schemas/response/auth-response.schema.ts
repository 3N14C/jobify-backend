import { z } from 'zod';

export const authResponseSchema = z
  .object({
    id: z.cuid2(),
  })
  .meta({
    id: 'AuthResponse',
    description: 'Auth response',
  });

export type TAuthResponse = z.infer<typeof authResponseSchema>;