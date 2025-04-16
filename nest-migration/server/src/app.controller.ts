import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersRepository } from './users/users.repository';
import { ProgressRepository } from './progress/progress.repository';
import { QuizAttemptsRepository } from './quiz-attempts/quiz-attempts.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersRepo: UsersRepository,
    private readonly progressRepo: ProgressRepository,
    private readonly quizAttemptsRepo: QuizAttemptsRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('debug')
  getDebugInfo() {
    // Create test data
    const userId = '999';
    this.usersRepo.create({
      id: userId,
      username: 'debuguser',
      email: 'debug@example.com',
      password: 'debug123',
    });

    this.progressRepo.create({
      id: 'progress1',
      userId,
      moduleId: 'module1',
      completed: false,
      score: 0,
    });

    // Return counts
    const users = this.usersRepo.findById(userId);
    const progress = this.progressRepo.findByUserId(userId);

    return {
      message: 'Debug info',
      users: !!users,
      progress: !!progress,
    };
  }
}
