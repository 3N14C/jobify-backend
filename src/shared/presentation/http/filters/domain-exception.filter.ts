import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DomainError, TDomainKindError } from '../../../domain/errors/domain.error.js';
import { type Response } from 'express';

const STATUS: Record<TDomainKindError, HttpStatus> = {
  not_found: HttpStatus.NOT_FOUND,
  conflict: HttpStatus.CONFLICT,
  invalid: HttpStatus.UNPROCESSABLE_ENTITY,
  unauthorized: HttpStatus.UNAUTHORIZED,
};

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(error: DomainError, host: ArgumentsHost): any {
    const status = STATUS[error.kind];

    host.switchToHttp().getResponse<Response>().status(status).json({
      statusCode: status,
      message: error.message,
    });
  }
}