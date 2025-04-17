import { IsNotEmpty } from "class-validator";

import { IsString } from "class-validator";
import { InsertUser } from "shared/schema";

// Add LoginDto class
export class LoginDto implements Pick<InsertUser, "username" | "password"> {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
