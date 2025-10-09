import IStudentRepository from "../../domain/repositories/IStudentRepository";
import Student from "../../domain/entities/Student";
import IUseCase from "@/shared/types/IUseCase";

type Input = Partial<Student>;
type Output = Student | null;

export default class FindOneStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute(input: Input): Promise<Output> {
    return await this.repository.findOne(input);
  }
}
