import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { MemStorageService } from "../shared/mem-storage.service";
import { InsertQuizAttempt } from "shared/schema";

@Controller()
export class QuizController {
  constructor(private readonly storageService: MemStorageService) {}

  @Post("attempt")
  async saveAttempt(@Body() quizData: InsertQuizAttempt) {
    try {
      const attempt = await this.storageService.saveQuizAttempt(quizData);
      return attempt;
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("attempts/:userId/:tutorialId")
  async getAttempts(
    @Param("userId") userId: string,
    @Param("tutorialId") tutorialId: string
  ) {
    try {
      const attempts = await this.storageService.getQuizAttempts(
        parseInt(userId),
        tutorialId
      );
      return attempts;
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
