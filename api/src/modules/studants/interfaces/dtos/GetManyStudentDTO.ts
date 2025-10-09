import { IsString, IsEmail, MaxLength, Min, Max, IsEnum, IsInt, IsOptional } from "class-validator";
import Student from "../../domain/entities/Student";
import { Type } from "class-transformer";

enum StudentOrderByEnum {
  id = "id",
  name = "name",
  email = "email",
  cpf = "cpf",
  RA = "RA",
  createdAt = "createdAt",
  modifiedAt = "modifiedAt",
}

export class GetManyStudentDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  pageSize?: number;

  @IsEnum(StudentOrderByEnum)
  @IsOptional()
  orderBy?: keyof Student;

  @IsEnum({
    asc: "asc",
    desc: "desc",
  })
  @IsOptional()
  orderType?: "asc" | "desc";

  @IsString()
  @IsOptional()
  @MaxLength(100)
  id?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(14)
  cpf?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  RA?: string;
}
