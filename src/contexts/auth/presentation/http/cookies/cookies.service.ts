import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../../../../shared/infra/config/app-config.service.js';
import { ITokens } from '../../../application/outputs/tokens.output.js';
import { CookieOptions, type Response } from 'express';

export type TCookieTokenName = 'accessToken' | 'refreshToken';

@Injectable()
export class CookiesService {
  constructor(private readonly config: AppConfigService) {}

  saveTokens(res: Response, tokens: ITokens): void {
    this.saveToken(res, tokens.accessToken, 'accessToken');
    this.saveToken(res, tokens.refreshToken, 'refreshToken');
  }

  private saveToken(res: Response, token: string, name: TCookieTokenName): void {
    const expiresInSeconds = this.config.get(
      name === 'accessToken' ? 'ACCESS_TOKEN_EXPIRES_IN' : 'REFRESH_TOKEN_EXPIRES_IN',
    );

    res.cookie(name, token, {
      expires: new Date(Date.now() + expiresInSeconds * 1000),
      ...this.baseOptions(name),
    });
  }

  private baseOptions(name: TCookieTokenName): CookieOptions {
    return {
      path: this.config.get(name === 'refreshToken' ? 'COOKIE_REFRESH_PATH' : 'COOKIE_PATH'),
      httpOnly: true,
      sameSite: this.config.get('COOKIE_SAME_SITE'),
      secure: this.config.get('NODE_ENV') === 'production',
    };
  }
}