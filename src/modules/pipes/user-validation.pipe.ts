import {
  ArgumentMetadata,
  ExecutionContext,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from 'src/exceptions/validation-error.exception';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) throw new ValidationError(errors.toString());
    return value;
  }
}
