import IStudentRepository from "../../domain/repositories/IStudentRepository";
import Student from "../../domain/entities/Student";
import IUseCase from "@/shared/types/IUseCase";

type Input = undefined;
type Output = Student[];

export default class FindManyStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute(): Promise<Output> {
    return await this.repository.findMany();
  }
}
