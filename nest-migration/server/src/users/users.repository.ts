import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(user: User): Promise<User> {
    this.databaseService.getUsers().set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.databaseService.getUsers().get(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const users = this.databaseService.getUsers();
    for (const user of users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const users = this.databaseService.getUsers();
    for (const user of users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }
} 