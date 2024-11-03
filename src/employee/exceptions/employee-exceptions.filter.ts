import { Catch, HttpStatus } from '@nestjs/common';
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { Request, Response } from 'express';
import { EmployeeError } from './employee.error';

@Catch(EmployeeError)
export class EmployeeExceptionsFilter implements ExceptionFilter {
  catch(exception: EmployeeError, host: ArgumentsHost) {
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
