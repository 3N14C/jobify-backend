import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import { TUserOutput, UserOutputMapper } from '../outputs/user.output.js';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly usersPort: UsersPort) {}

  async execute(): Promise<TUserOutput[]> {
    const users = await this.usersPort.findAll();

    return users.map(UserOutputMapper.fromDomain);
  }
}