import { Injectable } from '@nestjs/common';
import { TokensPort } from '../../../application/ports/tokens.port.js';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, ITokens } from '../../../application/outputs/tokens.output.js';
import { AppConfigService } from '../../../../../shared/infra/config/app-config.service.js';

export type TTokenKind = 'access' | 'refresh';

@Injectable()
export class JwtTokensAdapter implements TokensPort {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: AppConfigService,
  ) {}

  async generateTokens(payload: ITokenPayload): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload, 'access'),
      this.generateToken(payload, 'refresh'),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwt.verifyAsync(token, {
      algorithms: ['HS256'],
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  verifyRefreshToken(token: string): Promise<ITokenPayload> {
    return this.jwt.verifyAsync(token, {
      algorithms: ['HS256'],
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  private generateToken(payload: ITokenPayload, kind: TTokenKind): Promise<string> {
    return this.jwt.signAsync(payload, {
      algorithm: 'HS256',
      secret: this.config.get(kind === 'access' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get(kind === 'access' ? 'ACCESS_TOKEN_EXPIRES_IN' : 'REFRESH_TOKEN_EXPIRES_IN'),
    });
  }
}