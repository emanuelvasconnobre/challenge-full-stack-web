import { PaginatedResult, PaginationOptions } from "@/shared/types/Pagination";
import Student from "../entities/Student";
import StudentFilter from "../object-values/StudentFilter";
import StudentUpdatableAttributes from "../object-values/StudentUpdatableAttributes";

export default interface IStudentRepository {
  create(student: Omit<Student, "id">): Promise<Student>;
  findOne(options: Partial<Student>): Promise<Student | null>;
  findMany(options: PaginationOptions<StudentFilter>): Promise<PaginatedResult<Student>>;
  update(id: string, student: StudentUpdatableAttributes): Promise<Student>;
  delete(id: string): Promise<void>;
}
