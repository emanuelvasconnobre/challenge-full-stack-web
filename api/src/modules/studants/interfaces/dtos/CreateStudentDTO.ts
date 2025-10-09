import IsCPF from "@/shared/infrastructure/validation/constraints/IsCPF";
import { IsString, IsNotEmpty, IsEmail, MaxLength } from "class-validator";

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsCPF()
  cpf!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  RA!: string;
}
