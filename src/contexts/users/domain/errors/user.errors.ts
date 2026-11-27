import { DomainError } from '../../../../shared/domain/errors/domain.error.js';

export class UserNotFoundError extends DomainError {
  constructor() {
    super('Пользователь не найден', 'not_found');
  }
}

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('Пользователь с таким email уже существует', 'conflict');
  }
}