import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface QuizAttempt {
  id: string;
  userId: string;
  moduleId: string;
  score: number;
  answers: string[];
  completed: boolean;
}

@Injectable()
export class QuizAttemptsRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(quizAttempt: QuizAttempt): Promise<QuizAttempt> {
    this.databaseService.getQuizAttempts().set(quizAttempt.id, quizAttempt);
    return quizAttempt;
  }

  async findById(id: string): Promise<QuizAttempt | undefined> {
    return this.databaseService.getQuizAttempts().get(id);
  }

  async findByUserId(userId: string): Promise<QuizAttempt[]> {
    const quizAttempts = this.databaseService.getQuizAttempts();
    const result: QuizAttempt[] = [];
    
    for (const attempt of quizAttempts.values()) {
      if (attempt.userId === userId) {
        result.push(attempt);
      }
    }
    
    return result;
  }

  async update(id: string, data: Partial<QuizAttempt>): Promise<QuizAttempt> {
    const quizAttempts = this.databaseService.getQuizAttempts();
    const existing = quizAttempts.get(id);
    
    if (!existing) {
      throw new Error(`Quiz attempt with id ${id} not found`);
    }
    
    const updated = { ...existing, ...data };
    quizAttempts.set(id, updated);
    
    return updated;
  }
} 