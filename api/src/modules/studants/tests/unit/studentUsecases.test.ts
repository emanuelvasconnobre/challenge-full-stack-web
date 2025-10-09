jest.mock("../../infrastructure/db/prisma/PrismaStudentRepositoryImpl");
jest.mock("@/shared/infrastructure/db/prisma/prismaClient");

import { PaginationOptions } from "@/shared/types/Pagination";
import makeCreateStudent from "../../application/factories/makeCreateStudent";
import makeDeleteStudent from "../../application/factories/makeDeleteStudent";
import makeFindManyStudent from "../../application/factories/makeFindManyStudent";
import makeFindOneStudent from "../../application/factories/makeFindOneStudent";
import makeUpdateStudent from "../../application/factories/makeUpdateStudent";
import MockStudentRepository, { mockStudentData } from "./mock/MockStudentRepository";
import StudentFilter from "../../domain/object-values/StudentFilter";

describe("Student use cases", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  describe("Create student use case", () => {
    it("should create a student successfully", async () => {
      const mockRepo = new MockStudentRepository();
      const mockData = {
        name: "Test",
        email: "test@gtest.com",
        cpf: "999.999.999-99",
        RA: "932i39294",
      };
      const useCase = makeCreateStudent(mockRepo);

      const result = await useCase.execute(mockData);

      expect(result.name).toBe(mockStudentData.name);
      expect(mockRepo.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("Update student use case", () => {
    it("should update a student successfully", async () => {
      const mockRepo = new MockStudentRepository();
      const mockData = {
        id: "test213",
        name: "Test",
        email: "a+test@gtest.com",
      };
      const useCase = makeUpdateStudent(mockRepo);

      const result = await useCase.execute(mockData);

      expect(result.name).toBe(mockStudentData.name);
      expect(mockRepo.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("Find one student use case", () => {
    it("should get one student using a id filter successfully", async () => {
      const mockRepo = new MockStudentRepository();
      const mockData = {
        id: "test213",
      };
      const useCase = makeFindOneStudent(mockRepo);

      const result = await useCase.execute(mockData);

      expect(result?.name).toBe(mockStudentData.name);
      expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepo.findOne).toHaveBeenCalledWith(mockData);
    });
  });

  describe("Find many students use case", () => {
    it("should get many students successfully", async () => {
      const mockPaginationOptions: PaginationOptions<StudentFilter> = {
        page: 1,
        pageSize: 10,
        order: {
          attribute: "name",
          type: "asc",
        },
        attributes: {},
      };

      const mockRepo = new MockStudentRepository();
      const useCase = makeFindManyStudent(mockRepo);

      const result = await useCase.execute(mockPaginationOptions);

      expect(result.items[0]?.name).toBe(mockStudentData.name);
      expect(mockRepo.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("Delete student use case", () => {
    it("should delete a student successfully", async () => {
      const mockRepo = new MockStudentRepository();
      const useCase = makeDeleteStudent(mockRepo);
      const mockData = {
        id: "test213",
      };

      const result = await useCase.execute(mockData);

      expect(result).toBe(undefined);
      expect(mockRepo.delete).toHaveBeenCalledTimes(1);
    });
  });
});
