import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEnvConfig } from './app-config.schema.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get<K extends keyof TEnvConfig>(key: K): TEnvConfig[K] {
    return this.config.getOrThrow(key);
  }
}