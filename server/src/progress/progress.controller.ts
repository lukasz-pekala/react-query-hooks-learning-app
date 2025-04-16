import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { StorageService, InsertProgress } from "../shared/storage.service";

@Controller("api/progress")
export class ProgressController {
  constructor(private readonly storageService: StorageService) {}

  @Get(":userId")
  async getUserProgress(@Param("userId") userId: string) {
    try {
      const progress = await this.storageService.getUserProgress(
        parseInt(userId)
      );
      return progress;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        (error as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async updateProgress(@Body() progressData: InsertProgress) {
    try {
      const progress = await this.storageService.updateUserProgress(
        progressData
      );
      return progress;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        (error as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
