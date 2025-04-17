import { Global, Module } from "@nestjs/common";
import { MemStorageService } from "./mem-storage.service";
import { LoggerService } from "./logger.service";

@Module({
  providers: [MemStorageService, LoggerService],
  exports: [MemStorageService, LoggerService],
})
export class SharedModule {}
