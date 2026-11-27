import { Injectable } from '@nestjs/common';
import { AuthUsersPort } from '../ports/auth-users.port.js';
import { ITokens } from '../outputs/tokens.output.js';
import { ISignInCommand } from '../commands/sign-in.command.js';
import { TokensPort } from '../ports/tokens.port.js';
import { AuthInvalidCredentials } from '../../domain/errors/auth.errors.js';
import { PasswordVerifierPort } from '../ports/password-verifier.port.js';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly authUsersPort: AuthUsersPort,
    private readonly tokensPort: TokensPort,
    private readonly passwordVerifierPort: PasswordVerifierPort,
  ) {}

  async execute(command: ISignInCommand): Promise<ITokens> {
    const user = await this.authUsersPort.findCredentialsByEmail(command.email);

    if (!user) throw new AuthInvalidCredentials();

    const isPasswordCorrect = await this.passwordVerifierPort.verify(user.hashedPassword, command.password);

    if (!isPasswordCorrect) throw new AuthInvalidCredentials();

    return this.tokensPort.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }
}