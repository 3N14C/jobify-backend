import { DomainError } from '../../../../shared/domain/errors/domain.error.js';

export class AuthInvalidCredentials extends DomainError {
  constructor() {
    super('Неверно введены email или пароль', 'unauthorized');
  }
}