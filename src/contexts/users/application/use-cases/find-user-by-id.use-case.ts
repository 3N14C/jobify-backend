import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import { UserNotFoundError } from '../../domain/errors/user.errors.js';
import { TUserOutput, UserOutputMapper } from '../outputs/user.output.js';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly usersPort: UsersPort) {}

  async execute(id: string): Promise<TUserOutput> {
    const user = await this.usersPort.findById(id);

    if (!user) throw new UserNotFoundError();

    return UserOutputMapper.fromDomain(user);
  }
}