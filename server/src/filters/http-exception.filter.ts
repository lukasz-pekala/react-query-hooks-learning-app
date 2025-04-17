import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : "Internal Server Error";

    const responseBody = {
      message,
    };

    response.status(status).json(responseBody);

    // Log the error
    this.logger.error(
      `Exception: ${
        exception instanceof Error ? exception.message : "Unknown error"
      }`
    );
    if (exception instanceof Error && exception.stack) {
      this.logger.debug(exception.stack);
    }
  }
}
