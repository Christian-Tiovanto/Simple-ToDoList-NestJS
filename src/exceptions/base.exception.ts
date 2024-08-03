import { JsonApiValidationError } from 'src/interfaces/json-api-error.interface';

export abstract class BaseValidationException extends Error {
  public abstract errors: JsonApiValidationError;
}
