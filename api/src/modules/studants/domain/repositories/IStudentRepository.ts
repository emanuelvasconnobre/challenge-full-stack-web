import Student from "../entities/Student";

type StudentUpdateblaAttributes = {
  name: string;
  email: string;
};

export default interface IStudentRepository {
  create(student: Omit<Student, "id">): Promise<Student>;
  findOne(options: Partial<Student>): Promise<Student | null>;
  findMany(): Promise<Student[]>;
  update(id: string, student: StudentUpdateblaAttributes): Promise<Student>;
  delete(id: string): Promise<void>;
}
