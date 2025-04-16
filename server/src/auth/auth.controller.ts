import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { StorageService, InsertUser } from "../shared/storage.service";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly storageService: StorageService) {}

  @Post("register")
  async register(@Body() userData: InsertUser) {
    try {
      const user = await this.storageService.createUser(userData);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("login")
  async login(
    @Body() { username, password }: { username: string; password: string }
  ) {
    try {
      const user = await this.storageService.getUserByUsername(username);
      if (!user || user.password !== password) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      return { id: user.id, username: user.username };
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
