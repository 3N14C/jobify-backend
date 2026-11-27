import { Module } from '@nestjs/common';
import { UsersController } from './presentation/http/controllers/users.controller.js';
import { UsersPort } from './application/ports/users.port.js';
import { PrismaUsersAdapter } from './infra/adapters/prisma/prisma-users.adapter.js';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.use-case.js';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case.js';
import { UsersFacade } from './application/users.facade.js';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case.js';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case.js';
import { PasswordHasherPort } from './application/ports/password-hasher.port.js';
import { Argon2PasswordHasherAdapter } from './infra/adapters/argon2/argon2-password-hasher.adapter.js';

@Module({
  providers: [
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    {
      provide: UsersPort,
      useClass: PrismaUsersAdapter,
    },
    {
      provide: PasswordHasherPort,
      useClass: Argon2PasswordHasherAdapter,
    },
    UsersFacade,
  ],
  controllers: [UsersController],
  exports: [UsersFacade],
})
export class UsersModule {}