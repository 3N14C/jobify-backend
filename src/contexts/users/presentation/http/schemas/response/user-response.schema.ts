import { z } from 'zod';

export const userResponseSchema = z
  .object({
    id: z.cuid2().meta({ description: 'User id' }),
    name: z.string().meta({ description: 'User name' }),
    email: z.email().meta({ description: 'User email' }),
    createdAt: z.iso.datetime().meta({ description: 'User created at' }),
  })
  .meta({ id: 'UserResponse' });

export type TUserResponse = z.infer<typeof userResponseSchema>;