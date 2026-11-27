import { Injectable } from '@nestjs/common';
import { AuthUsersPort } from '../ports/auth-users.port.js';
import { ISignUpCommand } from '../commands/sign-up.command.js';
import { TokensPort } from '../ports/tokens.port.js';
import { ITokens } from '../outputs/tokens.output.js';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authUsersPort: AuthUsersPort,
    private readonly tokensPort: TokensPort,
  ) {}

  async execute(command: ISignUpCommand): Promise<ITokens> {
    const user = await this.authUsersPort.signUp(command);

    return this.tokensPort.generateTokens({
      sub: user.id,
      email: user.email,
    });
  }
}