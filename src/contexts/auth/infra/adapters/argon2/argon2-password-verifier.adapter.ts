import { Injectable } from '@nestjs/common';
import { PasswordVerifierPort } from '../../../application/ports/password-verifier.port.js';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2PasswordVerifierAdapter implements PasswordVerifierPort {
  verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}