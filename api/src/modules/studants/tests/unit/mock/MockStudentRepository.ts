import Student from "@/modules/studants/domain/entities/Student";
import StudentFilter from "@/modules/studants/domain/object-values/StudentFilter";
import StudentUpdatableAttributes from "@/modules/studants/domain/object-values/StudentUpdatableAttributes";
import IStudentRepository from "@/modules/studants/domain/repositories/IStudentRepository";
import { PaginatedResult, PaginationOptions } from "@/shared/types/Pagination";
import { randomUUID } from "crypto";

export const mockStudentData = new Student({
  id: randomUUID(),
  name: "Test",
  email: "test@gtest.com",
  cpf: "999.999.999-99",
  RA: "12346555656",
  createdAt: new Date(),
  modifiedAt: new Date(),
});

const mockPaginatedResult: PaginatedResult<Student> = {
  items: [mockStudentData],
  total: 1,
  page: 1,
  pageSize: 10,
  totalPages: 0,
  order: {
    attribute: "name",
    type: "asc",
  },
};

export default class MockStudentRepository implements IStudentRepository {
  create = jest.fn<Promise<Student>, [Omit<Student, "id">]>().mockResolvedValue(mockStudentData);
  findOne = jest.fn<Promise<Student>, [Partial<Student>]>().mockResolvedValue(mockStudentData);
  findMany = jest
    .fn<Promise<PaginatedResult<Student>>, [PaginationOptions<StudentFilter>]>()
    .mockResolvedValue(mockPaginatedResult);
  update = jest
    .fn<Promise<Student>, [string, StudentUpdatableAttributes]>()
    .mockResolvedValue(mockStudentData);
  delete = jest.fn<Promise<void>, [string]>().mockResolvedValue(undefined);
}
