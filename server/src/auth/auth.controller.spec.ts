import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { MemStorageService } from "../shared/mem-storage.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import "reflect-metadata";
import { InsertUser } from "shared/schema";

describe("AuthController", () => {
  let controller: AuthController;
  let storageService: MemStorageService;

  const mockMemStorageService = {
    createUser: jest.fn(),
    getUserByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: MemStorageService,
          useValue: mockMemStorageService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    storageService = module.get<MemStorageService>(MemStorageService);
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "testpass",
      };

      const mockCreatedUser = {
        id: 1,
        username: "testuser",
      };

      mockMemStorageService.createUser.mockResolvedValue(mockCreatedUser);

      const result = await controller.register(mockUserData);

      expect(result).toEqual(mockCreatedUser);
      expect(storageService.createUser).toHaveBeenCalledWith(mockUserData);
    });

    it("should throw an HttpException when registration fails", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "testpass",
      };

      const errorMessage = "Failed to create user";
      mockMemStorageService.createUser.mockRejectedValue(new Error(errorMessage));

      await expect(controller.register(mockUserData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "testpass",
      };

      const mockUser = {
        id: 1,
        ...mockUserData,
      };

      mockMemStorageService.getUserByUsername.mockResolvedValue(mockUser);

      const result = await controller.login(mockUserData);

      expect(result).toEqual({
        id: mockUser.id,
        username: mockUser.username,
      });
      expect(storageService.getUserByUsername).toHaveBeenCalledWith(
        mockUserData.username
      );
    });

    it("should throw an HttpException when user is not found", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "testpass",
      };

      mockMemStorageService.getUserByUsername.mockResolvedValue(undefined);

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED)
      );
    });

    it("should throw an HttpException when password is incorrect", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "wrongpass",
      };

      const mockUser = {
        id: 1,
        username: mockUserData.username,
        password: "testpass",
      };

      mockMemStorageService.getUserByUsername.mockResolvedValue(mockUser);

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED)
      );
    });

    it("should throw an HttpException when login fails", async () => {
      const mockUserData: InsertUser = {
        username: "testuser",
        password: "testpass",
      };

      const errorMessage = "Database error";
      mockMemStorageService.getUserByUsername.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
