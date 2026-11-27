import { StandardSchemaValidationPipe, VersioningType } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './shared/infra/config/app-config.service.js';
import { setupSwagger } from './shared/infra/openapi/setup-swagger.js';
import { DomainExceptionFilter } from './shared/presentation/http/filters/domain-exception.filter.js';
import cookieParser from 'cookie-parser';

export function configureApp(app: NestExpressApplication): void {
  const config = app.get(AppConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: config.get('ORIGIN'),
    credentials: true,
  });
  app.useGlobalPipes(new StandardSchemaValidationPipe({ transform: true }));
  app.useGlobalFilters(new DomainExceptionFilter());
  app.enableVersioning({ prefix: 'v', defaultVersion: '1', type: VersioningType.URI });

  app.use(cookieParser());

  setupSwagger(app);
}