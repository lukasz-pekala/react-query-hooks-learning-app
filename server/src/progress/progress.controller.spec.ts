import { Test, TestingModule } from "@nestjs/testing";
import { ProgressController } from "./progress.controller";
import { MemStorageService } from "../shared/mem-storage.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Progress } from "shared/schema";
import "reflect-metadata";

describe("ProgressController", () => {
  let controller: ProgressController;
  let storageService: MemStorageService;

  const mockStorageService = {
    getUserProgress: jest.fn(),
    updateUserProgress: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [
        {
          provide: MemStorageService,
          useValue: mockStorageService,
        },
      ],
    }).compile();

    controller = module.get<ProgressController>(ProgressController);
    storageService = module.get<MemStorageService>(MemStorageService);
  });

  describe("getUserProgress", () => {
    it("should return user progress successfully", async () => {
      const userId = "1";
      const mockProgress: Progress[] = [
        {
          id: 1,
          userId: 1,
          tutorialId: "tutorial-1",
          completed: true,
          quizCompleted: true,
          lastViewed: new Date().toISOString(),
        },
      ];

      mockStorageService.getUserProgress.mockResolvedValue(mockProgress);

      const result = await controller.getUserProgress(userId);

      expect(result).toEqual(mockProgress);
      expect(storageService.getUserProgress).toHaveBeenCalledWith(
        parseInt(userId)
      );
    });

    it("should throw an HttpException when getting progress fails", async () => {
      const userId = "1";
      const errorMessage = "Failed to get user progress";

      mockStorageService.getUserProgress.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(controller.getUserProgress(userId)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe("updateUserProgress", () => {
    it("should update progress successfully", async () => {
      const mockProgressData = {
        userId: 1,
        tutorialId: "tutorial-1",
        completed: true,
        quizCompleted: true,
        lastViewed: new Date().toISOString(),
      };

      const mockUpdatedProgress = {
        id: 1,
        ...mockProgressData,
      };

      mockStorageService.updateUserProgress.mockResolvedValue(
        mockUpdatedProgress
      );

      const result = await controller.updateUserProgress(mockProgressData);

      expect(result).toEqual(mockUpdatedProgress);
      expect(storageService.updateUserProgress).toHaveBeenCalledWith(
        mockProgressData
      );
    });

    it("should throw an HttpException when update fails", async () => {
      const mockProgressData: Progress = {
        userId: 1,
        tutorialId: "tutorial-1",
        completed: true,
        quizCompleted: true,
        lastViewed: new Date().toISOString(),
        id: 0
      };

      const errorMessage = "Failed to update progress";
      mockStorageService.updateUserProgress.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(
        controller.updateUserProgress(mockProgressData)
      ).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
