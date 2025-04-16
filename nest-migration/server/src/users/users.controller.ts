import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersRepository, User } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.usersRepository.create(user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | undefined> {
    return this.usersRepository.findById(id);
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string): Promise<User | undefined> {
    return this.usersRepository.findByUsername(username);
  }
} 