import { ISignUpCommand } from '../commands/sign-up.command.js';
import { IAuthUserCredentials, IAuthUserEntity } from '../outputs/auth.outputs.js';

export abstract class AuthUsersPort {
  abstract signUp(command: ISignUpCommand): Promise<IAuthUserEntity>;
  abstract findCredentialsByEmail(email: string): Promise<IAuthUserCredentials | null>;
}