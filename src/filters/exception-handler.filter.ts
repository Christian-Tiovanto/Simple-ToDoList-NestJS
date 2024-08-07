import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { BaseValidationException } from 'src/exceptions/base.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    switch (true) {
      case exception instanceof BaseValidationException:
        response.status(HttpStatus.BAD_REQUEST);
        response.json({
          error: exception.errors,
        });
        break;
      case (exception as any).code == 23505:
        response.status(HttpStatus.CONFLICT);
        response.json({
          error: exception,
          path: request.originalUrl,
        });
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        console.log('exception');
        console.log(exception);
        response.json({
          message: 'something went wrong',
          errors: exception.stack,
        });
    }
  }
}
