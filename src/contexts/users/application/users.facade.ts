import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.use-case.js';
import { UsersPort } from './ports/users.port.js';
import { TUser } from '../domain/entities/user.entity.js';
import { ICreateUserCommand } from './commands/create-user.command.js';
import { TUserOutput } from './outputs/user.output.js';

@Injectable()
export class UsersFacade {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly usersPort: UsersPort,
  ) {}

  async create(command: ICreateUserCommand): Promise<TUserOutput> {
    return this.createUseCase.execute(command);
  }

  async findCredentialsByEmail(email: string): Promise<Pick<TUser, 'id' | 'email' | 'hashedPassword'> | null> {
    const user = await this.usersPort.findByEmail(email);

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      hashedPassword: user.hashedPassword,
    };
  }
}