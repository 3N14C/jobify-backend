import { Module } from '@nestjs/common';
import { UsersController } from './presentation/http/controllers/users.controller.js';
import { UsersPort } from './application/ports/users.port.js';
import { PrismaUsersAdapter } from './infra/adapters/prisma/prisma-users.adapter.js';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.use-case.js';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case.js';

@Module({
  providers: [
    FindAllUsersUseCase,
    FindUserByIdUseCase,
    {
      provide: UsersPort,
      useClass: PrismaUsersAdapter,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}