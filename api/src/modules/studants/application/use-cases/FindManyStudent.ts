import IStudentRepository from "../../domain/repositories/IStudentRepository";
import Student from "../../domain/entities/Student";
import IUseCase from "@/shared/types/IUseCase";
import { PaginationOptions, PaginatedResult } from "@/shared/types/Pagination";
import StudentFilter from "../../domain/object-values/StudentFilter";

type Input = PaginationOptions<StudentFilter>;
type Output = PaginatedResult<Student>;

export default class FindManyStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute(options: Input): Promise<Output> {
    return await this.repository.findMany(options);
  }
}
