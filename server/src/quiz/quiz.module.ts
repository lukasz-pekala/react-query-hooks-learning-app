import { Module } from "@nestjs/common";
import { QuizController } from "./quiz.controller";
import { SharedModule } from "../shared/shared.module";
import { MemStorageService } from "../shared/mem-storage.service";

@Module({
  imports: [SharedModule],
  controllers: [QuizController],
  providers: [MemStorageService],
})
export class QuizModule {}
