import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import { UserNotFoundError } from '../../domain/errors/user.errors.js';
import { TUserOutput, UserOutputMapper } from '../outputs/user.output.js';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private readonly usersPort: UsersPort) {}

  async execute(email: string): Promise<TUserOutput> {
    const existingUser = await this.usersPort.findByEmail(email);

    if (!existingUser) throw new UserNotFoundError();

    return UserOutputMapper.fromDomain(existingUser);
  }
}