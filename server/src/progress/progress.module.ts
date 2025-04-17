import { Module } from "@nestjs/common";
import { ProgressController } from "./progress.controller";
import { SharedModule } from "../shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [ProgressController],
})
export class ProgressModule {}
