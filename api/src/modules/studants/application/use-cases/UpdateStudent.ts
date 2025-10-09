import IStudentRepository from "../../domain/repositories/IStudentRepository";
import Student from "../../domain/entities/Student";
import IUseCase from "@/shared/types/IUseCase";

type Input = { id: string; name: string; email: string };
type Output = Student;

export default class UpdateStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute({ id, ...input }: Input): Promise<Output> {
    return await this.repository.update(id, input);
  }
}
