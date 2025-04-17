import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggerService } from "../shared/logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        this.loggerService.log(`${method} ${url} - ${elapsed}ms`, "HTTP");
      })
    );
  }
}
