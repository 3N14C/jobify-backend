import { z } from 'zod';

export const userEntitySchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  email: z.email(),
  hashedPassword: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TUserEntity = z.infer<typeof userEntitySchema>;