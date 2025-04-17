import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { SharedModule } from "../shared/shared.module";
import { MemStorageService } from "../shared/mem-storage.service";

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [MemStorageService],
})
export class AuthModule {}
