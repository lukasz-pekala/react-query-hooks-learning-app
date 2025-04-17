import { Test } from "@nestjs/testing";
import { QuizController } from "./quiz.controller";
import { MemStorageService } from "../shared/mem-storage.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import "reflect-metadata";
import { InsertQuizAttempt } from "shared/schema";

describe("QuizController", () => {
  let controller: QuizController;
  let storageService: MemStorageService;

  const mockStorageService = {
    saveQuizAttempt: jest.fn(),
    getQuizAttempts: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [QuizController],
      providers: [
        {
          provide: MemStorageService,
          useValue: mockStorageService,
        },
      ],
    }).compile();

    controller = module.get(QuizController);
    storageService = module.get(MemStorageService);
  });

  describe("saveAttempt", () => {
    it("should save a quiz attempt successfully", async () => {
      const mockQuizData: InsertQuizAttempt = {
        userId: 1,
        tutorialId: "tutorial-1",
        score: 80,
        attemptedAt: new Date().toISOString(),
        answers: null
      };

      const mockSavedAttempt = {
        id: 1,
        ...mockQuizData,
      };

      mockStorageService.saveQuizAttempt.mockResolvedValue(mockSavedAttempt);

      const result = await controller.saveAttempt(mockQuizData);

      expect(result).toEqual(mockSavedAttempt);
      expect(storageService.saveQuizAttempt).toHaveBeenCalledWith(mockQuizData);
    });

    it("should throw an HttpException when save fails", async () => {
      const mockQuizData: InsertQuizAttempt = {
        userId: 1,
        tutorialId: "tutorial-1",
        score: 80,
        attemptedAt: new Date().toISOString(),
        answers: null
      };

      const errorMessage = "Failed to save quiz attempt";
      mockStorageService.saveQuizAttempt.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(controller.saveAttempt(mockQuizData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe("getAttempts", () => {
    it("should return quiz attempts for a user and tutorial", async () => {
      const userId = "1";
      const tutorialId = "tutorial-1";
      const mockAttempts = [
        {
          id: 1,
          userId: 1,
          tutorialId,
          score: 80,
          totalQuestions: 10,
          attemptedAt: new Date().toISOString(),
        },
      ];

      mockStorageService.getQuizAttempts.mockResolvedValue(mockAttempts);

      const result = await controller.getAttempts(userId, tutorialId);

      expect(result).toEqual(mockAttempts);
      expect(storageService.getQuizAttempts).toHaveBeenCalledWith(
        parseInt(userId),
        tutorialId
      );
    });

    it("should throw an HttpException when get attempts fails", async () => {
      const userId = "1";
      const tutorialId = "tutorial-1";
      const errorMessage = "Failed to get quiz attempts";

      mockStorageService.getQuizAttempts.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(controller.getAttempts(userId, tutorialId)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
