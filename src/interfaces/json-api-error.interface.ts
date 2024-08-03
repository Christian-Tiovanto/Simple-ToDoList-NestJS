import { HttpStatus } from '@nestjs/common';

export interface JsonApiValidationError {
  status: string | HttpStatus;
  title: string;
}
