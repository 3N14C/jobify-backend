import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './shared/infra/config/app-config.service.js';
import { Logger } from '@nestjs/common';
import { configureApp } from './configure-app.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(bootstrap.name);
  const config = app.get(AppConfigService);

  configureApp(app);

  await app.listen(config.get('PORT'));

  logger.log(`Application listening port: ${config.get('PORT')}`);
}
await bootstrap();
