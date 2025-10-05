import Student from "@/modules/studants/domain/entities/Student";
import IStudentRepository from "@/modules/studants/domain/repositories/IStudentRepository";
import { AppPrismaClient } from "@/shared/infrastructure/db/prisma/prismaClient";
import DatabaseException from "@/shared/infrastructure/exceptions/DatabaseException";
import makeLoggerInstance from "@/shared/infrastructure/logger";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class PrismaStudentRepositoryImpl implements IStudentRepository {
  private readonly logger = makeLoggerInstance("PrismaStudentRepositoryImpl");

  constructor(private readonly prismaClient: AppPrismaClient) {}

  async create(student: Omit<Student, "id">): Promise<Student> {
    try {
      const newEntity = await this.prismaClient.student.create({
        data: student,
      });

      return newEntity;
    } catch (e) {
      this.catchErrorHandler(e);

      throw new DatabaseException({ stack: e });
    }
  }

  async findOne(options: Partial<Student>): Promise<Student | null> {
    try {
      const entity = await this.prismaClient.student.findFirst({
        where: options,
      });

      return entity;
    } catch (e) {
      this.catchErrorHandler(e);

      throw new DatabaseException({ stack: e });
    }
  }

  async findMany(): Promise<Student[]> {
    try {
      const entities = await this.prismaClient.student.findMany();

      return entities;
    } catch (e) {
      this.catchErrorHandler(e);

      throw new DatabaseException({ stack: e });
    }
  }

  async update(id: string, student: { name: string; email: string }): Promise<Student> {
    try {
      const entity = await this.prismaClient.student.update({
        data: student,
        where: {
          id,
        },
      });

      return entity;
    } catch (e) {
      this.catchErrorHandler(e);

      throw new DatabaseException({ stack: e });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaClient.student.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      this.catchErrorHandler(e);

      throw new DatabaseException({ stack: e });
    }
  }

  private catchErrorHandler(error: any) {
    this.logger.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      throw new DatabaseException({
        message: error.message,
        stack: error.stack,
      });
    }
  }
}
