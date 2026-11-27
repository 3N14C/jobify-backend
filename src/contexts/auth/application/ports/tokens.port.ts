import { ITokenPayload, ITokens } from '../outputs/tokens.output.js';

export abstract class TokensPort {
  abstract generateTokens(payload: ITokenPayload): Promise<ITokens>;
  abstract verifyAccessToken(token: string): Promise<ITokenPayload>;
  abstract verifyRefreshToken(token: string): Promise<ITokenPayload>;
}