import { Module } from '@nestjs/common';
import { QuizAttemptsRepository } from './quiz-attempts.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [QuizAttemptsRepository],
  exports: [QuizAttemptsRepository],
})
export class QuizAttemptsModule {} 