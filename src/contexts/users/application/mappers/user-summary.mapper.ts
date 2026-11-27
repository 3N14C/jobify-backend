import type { TUser } from '../../domain/entities/user.entity.js';
import type { TUserSummary } from '../outputs/user-summary.js';

export const toUserSummary = (user: TUser): TUserSummary => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
});