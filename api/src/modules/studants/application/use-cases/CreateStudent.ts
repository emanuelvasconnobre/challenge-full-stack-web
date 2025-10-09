import { randomUUID } from "crypto";
import IStudentRepository from "../../domain/repositories/IStudentRepository";
import Student from "../../domain/entities/Student";
import IUseCase from "@/shared/types/IUseCase";

type Input = { name: string; email: string; cpf: string; RA: string };
type Output = Student;

export default class CreateStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute(input: Input): Promise<Output> {
    const now = new Date();

    const student = new Student({
      id: randomUUID(),
      createdAt: now,
      modifiedAt: now,
      ...input,
    });
    return await this.repository.create(student);
  }
}
