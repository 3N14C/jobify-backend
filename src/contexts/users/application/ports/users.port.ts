import type { TUser } from '../../domain/entities/user.entity.js';

export abstract class UsersPort {
  abstract findAll(): Promise<TUser[]>;
  abstract findById(id: string): Promise<TUser | null>;
  abstract findByEmail(email: string): Promise<TUser | null>;
  abstract create(user: Omit<TUser, 'id' | 'updatedAt' | 'createdAt'>): Promise<void>;
}