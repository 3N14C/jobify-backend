import { z } from 'zod';
import { TUser } from '../../domain/entities/user.entity.js';

export const userOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  email: z.email(),
  createdAt: z.iso.datetime(),
});

export type TUserOutput = z.infer<typeof userOutputSchema>;

export class UserOutputMapper {
  static fromDomain(user: TUser): TUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}