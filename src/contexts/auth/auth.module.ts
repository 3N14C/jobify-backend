import { Module } from '@nestjs/common';
import { AuthPort } from './application/ports/auth.port.js';
import { PrismaAuthAdapter } from './infra/adapters/prisma/prisma-auth.adapter.js';
import { PasswordHasherPort } from './application/ports/password-hasher.port.js';
import { Argon2PasswordHasherAdapter } from './infra/adapters/argon2/argon2-password-hasher.adapter.js';
import { AuthController } from './presentation/http/controllers/auth.controller.js';

@Module({
  providers: [
    {
      provide: AuthPort,
      useClass: PrismaAuthAdapter,
    },
    {
      provide: PasswordHasherPort,
      useClass: Argon2PasswordHasherAdapter,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}