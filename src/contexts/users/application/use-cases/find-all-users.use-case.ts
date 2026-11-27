import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import type { TUserSummary } from '../outputs/user-summary.js';
import { toUserSummary } from '../mappers/user-summary.mapper.js';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly usersPort: UsersPort) {}

  async execute(): Promise<TUserSummary[]> {
    const users = await this.usersPort.findAll();

    return users.map(toUserSummary);
  }
}