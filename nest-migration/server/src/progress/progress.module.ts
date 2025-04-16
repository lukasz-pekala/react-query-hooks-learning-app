import { Module } from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { DatabaseModule } from '../database/database.module';
import { ProgressController } from './progress.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgressController],
  providers: [ProgressRepository],
  exports: [ProgressRepository],
})
export class ProgressModule {} 