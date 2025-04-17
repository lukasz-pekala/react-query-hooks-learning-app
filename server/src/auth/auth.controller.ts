import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { MemStorageService } from "../shared/mem-storage.service";
import { LoginDto } from "./login.dto";
import { InsertUser } from "shared/schema";

@Controller()
export class AuthController {
  constructor(private readonly storageService: MemStorageService) {}

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
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.storageService.getUserByUsername(
        loginDto.username
      );
      if (!user || user.password !== loginDto.password) {
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
