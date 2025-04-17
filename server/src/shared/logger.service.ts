import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  log(message: string, source = "app"): void {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    this.logger.log(`${formattedTime} [${source}] ${message}`);
  }
}
