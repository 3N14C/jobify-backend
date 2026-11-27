import { Injectable } from '@nestjs/common';
import { UsersFacade } from '../../../../users/application/users.facade.js';
import { AuthUsersPort } from '../../../application/ports/auth-users.port.js';
import { ISignUpCommand } from '../../../application/commands/sign-up.command.js';
import { IAuthUserCredentials, IAuthUserEntity } from '../../../application/outputs/auth.outputs.js';

@Injectable()
export class UsersAuthAdapter implements AuthUsersPort {
  constructor(private readonly usersFacade: UsersFacade) {}

  signUp(command: ISignUpCommand): Promise<IAuthUserEntity> {
    return this.usersFacade.create(command);
  }

  findCredentialsByEmail(email: string): Promise<IAuthUserCredentials | null> {
    return this.usersFacade.findCredentialsByEmail(email);
  }
}