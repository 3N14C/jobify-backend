import { Injectable } from '@nestjs/common';
import { UsersPort } from '../ports/users.port.js';
import { ICreateUserCommand } from '../commands/create-user.command.js';
import { UserAlreadyExistsError } from '../../domain/errors/user.errors.js';
import { PasswordHasherPort } from '../ports/password-hasher.port.js';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersPort: UsersPort,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  async execute(command: ICreateUserCommand): Promise<void> {
    const existingUser = await this.usersPort.findByEmail(command.email);

    if (existingUser) throw new UserAlreadyExistsError();

    const hashedPassword = await this.passwordHasherPort.hash(command.password);

    await this.usersPort.create({
      name: command.name,
      email: command.email,
      hashedPassword,
    });
  }
}