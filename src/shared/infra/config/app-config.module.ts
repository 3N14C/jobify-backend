import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service.js';
import { appConfigSchema } from './app-config.schema.js';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validationSchema: appConfigSchema })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}