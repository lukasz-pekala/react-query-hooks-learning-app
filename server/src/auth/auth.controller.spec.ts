import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { StorageService } from "../shared/storage.service";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("AuthController", () => {
  let controller: AuthController;
  let storageService: StorageService;

  const mockStorageService = {
    createUser: jest.fn(),
    getUserByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    storageService = module.get<StorageService>(StorageService);
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const mockUserData = {
        username: "testuser",
        password: "testpass",
      };

      const mockCreatedUser = {
        id: 1,
        username: "testuser",
      };

      mockStorageService.createUser.mockResolvedValue(mockCreatedUser);

      const result = await controller.register(mockUserData);

      expect(result).toEqual(mockCreatedUser);
      expect(storageService.createUser).toHaveBeenCalledWith(mockUserData);
    });

    it("should throw an HttpException when registration fails", async () => {
      const mockUserData = {
        username: "testuser",
        password: "testpass",
      };

      const errorMessage = "Failed to create user";
      mockStorageService.createUser.mockRejectedValue(new Error(errorMessage));

      await expect(controller.register(mockUserData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe("login", () => {
    it("should login a user successfully", async () => {
      const mockUserData = {
        username: "testuser",
        password: "testpass",
      };

      const mockUser = {
        id: 1,
        ...mockUserData,
      };

      mockStorageService.getUserByUsername.mockResolvedValue(mockUser);

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
      const mockUserData = {
        username: "testuser",
        password: "testpass",
      };

      mockStorageService.getUserByUsername.mockResolvedValue(undefined);

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED)
      );
    });

    it("should throw an HttpException when password is incorrect", async () => {
      const mockUserData = {
        username: "testuser",
        password: "wrongpass",
      };

      const mockUser = {
        id: 1,
        username: mockUserData.username,
        password: "testpass",
      };

      mockStorageService.getUserByUsername.mockResolvedValue(mockUser);

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED)
      );
    });

    it("should throw an HttpException when login fails", async () => {
      const mockUserData = {
        username: "testuser",
        password: "testpass",
      };

      const errorMessage = "Database error";
      mockStorageService.getUserByUsername.mockRejectedValue(
        new Error(errorMessage)
      );

      await expect(controller.login(mockUserData)).rejects.toThrow(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
