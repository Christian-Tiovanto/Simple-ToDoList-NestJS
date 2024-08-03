import { JsonApiValidationError } from 'src/interfaces/json-api-error.interface';
import { BaseValidationException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class ValidationError extends BaseValidationException {
  public errors: JsonApiValidationError;
  constructor(message: string) {
    super(message);
    this.errors = {
      status: HttpStatus.BAD_REQUEST,
      title: message,
    };
  }
}
