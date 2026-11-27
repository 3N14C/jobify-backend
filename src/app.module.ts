import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infra/prisma/prisma.module.js';
import { AppConfigModule } from './shared/infra/config/app-config.module.js';
import { UsersModule } from './contexts/users/users.module.js';
import { AuthModule } from './contexts/auth/auth.module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}