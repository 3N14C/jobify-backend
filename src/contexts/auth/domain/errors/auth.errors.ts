import { DomainError } from '../../../../shared/domain/errors/domain.error.js';

export class InvalidEmailOrPasswordError extends DomainError {
  constructor() {
    super('Некорректные email или пароль', 'unauthorized');
  }
}