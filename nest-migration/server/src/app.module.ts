import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProgressModule } from './progress/progress.module';
import { QuizAttemptsModule } from './quiz-attempts/quiz-attempts.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProgressModule,
    QuizAttemptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
