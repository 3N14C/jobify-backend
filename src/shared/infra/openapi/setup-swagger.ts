import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Jobify API')
    .setDescription('Jobify HTTP API')
    .setVersion('1.0.0')
    .addCookieAuth('accessToken')
    .addSecurityRequirements('cookie')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'openapi.json',
    yamlDocumentUrl: 'openapi.yaml',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}