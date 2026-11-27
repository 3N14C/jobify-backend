import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import { UserNotFoundError } from '../../domain/errors/user.errors.js';
import { TUserSummary } from '../outputs/user-summary.js';
import { toUserSummary } from '../mappers/user-summary.mapper.js';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly usersPort: UsersPort) {}

  async execute(id: string): Promise<TUserSummary> {
    const user = await this.usersPort.findById(id);

    if (!user) throw new UserNotFoundError();

    return toUserSummary(user);
  }
}