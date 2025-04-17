import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { MemStorageService } from "../shared/mem-storage.service";
import { InsertProgress } from "shared/schema";

@Controller("progress")
export class ProgressController {
  constructor(private readonly storageService: MemStorageService) {}

  @Get(":userId")
  async getUserProgress(@Param("userId") userId: string) {
    try {
      console.log("ProgressController: getUserProgress", userId);
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
  @UsePipes(new ValidationPipe())
  async updateUserProgress(@Body() progressData: InsertProgress) {
    try {
      // Validation is handled by ValidationPipe and the DTO
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
