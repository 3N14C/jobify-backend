import { Module } from '@nestjs/common';
import { SignUpUseCase } from './application/use-cases/sign-up.use-case.js';
import { AuthUsersPort } from './application/ports/auth-users.port.js';
import { UsersAuthAdapter } from './infra/adapters/users/users-auth.adapter.js';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './presentation/http/controllers/auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { TokensPort } from './application/ports/tokens.port.js';
import { JwtTokensAdapter } from './infra/adapters/jwt/jwt-tokens.adapter.js';
import { CookiesService } from './presentation/http/cookies/cookies.service.js';
import { SignInUseCase } from './application/use-cases/sign-in.use-case.js';
import { PasswordVerifierPort } from './application/ports/password-verifier.port.js';
import { Argon2PasswordVerifierAdapter } from './infra/adapters/argon2/argon2-password-verifier.adapter.js';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    SignUpUseCase,
    SignInUseCase,
    {
      provide: AuthUsersPort,
      useClass: UsersAuthAdapter,
    },
    {
      provide: TokensPort,
      useClass: JwtTokensAdapter,
    },
    {
      provide: PasswordVerifierPort,
      useClass: Argon2PasswordVerifierAdapter,
    },
    CookiesService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}