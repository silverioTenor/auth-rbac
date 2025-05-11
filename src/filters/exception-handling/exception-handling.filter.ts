import {
   ExceptionFilter,
   Catch,
   ArgumentsHost,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionHandlingFilter implements ExceptionFilter {
   constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

   catch(exception: unknown, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();

      const httpStatus =
         exception instanceof HttpException
            ? {
               statusCode: exception.getStatus(),
               message: exception.getResponse(),
            }
            : {
               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
               message: 'Internal server error',
            };
      
      console.log('ERROR:: ', exception);

      const responseBody = {
         statusCode: httpStatus.statusCode,
         message: httpStatus.message,
         // timestamp: new Date().toISOString(),
         // path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus.statusCode);
   }
}
