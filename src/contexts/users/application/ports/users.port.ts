import type { TUser } from '../../domain/entities/user.entity.js';

export abstract class UsersPort {
  abstract findAll(): Promise<TUser[]>;
  abstract findById(id: string): Promise<TUser | null>;
}