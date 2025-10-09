import { IsString, IsOptional, IsEmail, MaxLength } from "class-validator";

export class UpdateStudentDTO {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email!: string;
}
