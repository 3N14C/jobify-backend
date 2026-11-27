import { Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '../../../application/ports/password-hasher.port.js';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2PasswordHasherAdapter implements PasswordHasherPort {
  hash(password: string): Promise<string> {
    return argon2.hash(password);
  }
}