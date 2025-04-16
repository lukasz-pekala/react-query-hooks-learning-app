import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface Progress {
  id: string;
  userId: string;
  moduleId: string;
  completed: boolean;
  score: number;
}

@Injectable()
export class ProgressRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(progress: Progress): Promise<Progress> {
    this.databaseService.getProgress().set(progress.id, progress);
    return progress;
  }

  async findById(id: string): Promise<Progress | undefined> {
    return this.databaseService.getProgress().get(id);
  }

  async findByUserId(userId: string): Promise<Progress[]> {
    const progress = this.databaseService.getProgress();
    const result: Progress[] = [];
    
    for (const item of progress.values()) {
      if (item.userId === userId) {
        result.push(item);
      }
    }
    
    return result;
  }

  async update(id: string, data: Partial<Progress>): Promise<Progress> {
    const progress = this.databaseService.getProgress();
    const existing = progress.get(id);
    
    if (!existing) {
      throw new Error(`Progress with id ${id} not found`);
    }
    
    const updated = { ...existing, ...data };
    progress.set(id, updated);
    
    return updated;
  }
} 