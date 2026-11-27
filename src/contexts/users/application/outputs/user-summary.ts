import type { TUser } from '../../domain/entities/user.entity.js';

export type TUserSummary = Pick<TUser, 'id' | 'name' | 'email'> & {
  createdAt: string;
};
