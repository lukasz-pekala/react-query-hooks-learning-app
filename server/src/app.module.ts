import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProgressModule } from "./progress/progress.module";
import { QuizModule } from "./quiz/quiz.module";
import { SharedModule } from "./shared/shared.module";

@Module({
  imports: [AuthModule, ProgressModule, QuizModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
