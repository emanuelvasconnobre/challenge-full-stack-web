import Student from "@/modules/studants/domain/entities/Student";
import IStudentRepository from "@/modules/studants/domain/repositories/IStudentRepository";
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

export default class MockStudentRepository implements IStudentRepository {
  create = jest.fn().mockResolvedValue(mockStudentData);
  findOne = jest.fn().mockResolvedValue(mockStudentData);
  findMany = jest.fn().mockResolvedValue([mockStudentData]);
  update = jest.fn().mockResolvedValue(mockStudentData);
  delete = jest.fn().mockResolvedValue(undefined);
}
