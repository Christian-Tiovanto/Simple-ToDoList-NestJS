import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log('exception di filter');
    console.log(exception);
    switch (true) {
      case exception instanceof ValidationError:
        response.status(HttpStatus.BAD_REQUEST);
        response.json({
          error: (exception as any).errors,
          path: request.originalUrl,
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
        response.json({ message: 'something went wrong', errors: exception });
    }
  }
}
