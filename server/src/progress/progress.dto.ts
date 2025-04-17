// import {
//   IsNumber,
//   IsString,
//   IsNotEmpty,
//   IsBoolean,
//   IsOptional,
//   IsDate,
// } from "class-validator";
// import { InsertProgress } from "shared/schema";
// import { Type } from "class-transformer";

// export class ProgressDto implements InsertProgress {
//   @IsNumber()
//   @IsNotEmpty()
//   userId!: number;

//   @IsString()
//   @IsNotEmpty()
//   tutorialId!: string;

//   @IsBoolean()
//   @IsOptional()
//   completed?: boolean;

//   @IsBoolean()
//   @IsOptional()
//   quizCompleted?: boolean;

//   @IsDate()
//   @IsOptional()
//   @Type(() => Date)
//   lastViewed?: Date | null;
// }
