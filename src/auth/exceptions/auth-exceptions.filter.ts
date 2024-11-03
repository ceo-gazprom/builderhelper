import { Catch, HttpStatus } from '@nestjs/common';
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthError } from './auth.error';

@Catch(AuthError)
export class AuthExceptionsFilter implements ExceptionFilter {
  catch(exception: AuthError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    if (request)
      response.status(status).json({
        code: exception.code,
        ...(exception.message ? { message: exception.message } : {}),
      });
  }
}
