import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProgressRepository, Progress } from './progress.repository';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressRepository: ProgressRepository) {}

  @Post()
  async createProgress(@Body() progress: Progress): Promise<Progress> {
    return this.progressRepository.create(progress);
  }

  @Get(':id')
  async getProgressById(@Param('id') id: string): Promise<Progress | undefined> {
    return this.progressRepository.findById(id);
  }

  @Get('user/:userId')
  async getProgressByUserId(@Param('userId') userId: string): Promise<Progress[]> {
    return this.progressRepository.findByUserId(userId);
  }

  @Put(':id')
  async updateProgress(@Param('id') id: string, @Body() progress: Partial<Progress>): Promise<Progress> {
    return this.progressRepository.update(id, progress);
  }
} 