import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from 'src/exceptions/validation-error.exception';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    const errorsKey = errors.map((error) => {
      return error.property;
    });
    const errorsValue = errors.map((error) => {
      return error.constraints;
    });
    console.log('errors di validation');
    console.log(errorsKey);
    console.log(errors);
    if (errors.length > 0)
      throw new ValidationError('Validation Error', errorsKey, errorsValue);
    return value;
  }
}
