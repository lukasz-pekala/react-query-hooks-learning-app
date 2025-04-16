import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private storage = {
    users: new Map(),
    progress: new Map(),
    quizAttempts: new Map(),
  };

  getUsers() {
    return this.storage.users;
  }

  getProgress() {
    return this.storage.progress;
  }

  getQuizAttempts() {
    return this.storage.quizAttempts;
  }

  getStorage() {
    return this.storage;
  }

  async runInTransaction(callback: (storage: any) => void) {
    // In a real implementation, this would handle transaction logic
    // For now, we just execute the callback with the storage
    return callback(this.storage);
  }
} 