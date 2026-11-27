import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly config: AppConfigService) {
    const adapter = new PrismaPg({ connectionString: config.get('DATABASE_URL') });

    super({
      adapter,
    });
  }

  async onModuleInit(): Promise<void> {
    return this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    return this.$disconnect();
  }
}
