import Student from "@/modules/studants/domain/entities/Student";
import StudentFilter from "@/modules/studants/domain/object-values/StudentFilter";
import StudentUpdatableAttributes from "@/modules/studants/domain/object-values/StudentUpdatableAttributes";
import IStudentRepository from "@/modules/studants/domain/repositories/IStudentRepository";
import { AppHttpException } from "@/shared/domain/exceptions/AppHttpException";
import { AppPrismaClient } from "@/shared/infrastructure/db/prisma/prismaClient";
import BusinessRuleException from "@/shared/infrastructure/exceptions/BusinessRuleException";
import DatabaseException from "@/shared/infrastructure/exceptions/DatabaseException";
import makeLoggerInstance from "@/shared/infrastructure/logger";
import { PaginatedResult, PaginationOptions } from "@/shared/types/Pagination";

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
      throw this.catchErrorHandler(e);
    }
  }

  async findOne(options: Partial<Student>): Promise<Student | null> {
    try {
      const entity = await this.prismaClient.student.findFirst({
        where: options,
      });

      return entity;
    } catch (e) {
      throw this.catchErrorHandler(e);
    }
  }

  async findMany(
    options: PaginationOptions<StudentFilter, Student>,
  ): Promise<PaginatedResult<Student>> {
    try {
      const attributes = options.attributes;
      const page = options.page ?? 1;
      const pageSize = options.pageSize ?? 50;
      const skip = (page - 1) * pageSize;
      const orderAttribute = options.order.attribute ?? "createdAt";
      const orderType = options.order.type ?? "asc";

      const [students, total] = await Promise.all([
        this.prismaClient.student.findMany({
          skip,
          take: pageSize,
          where: {
            id: {
              contains: attributes.id,
            },
            name: {
              contains: attributes.name,
            },
            email: {
              contains: attributes.email,
            },
            cpf: {
              contains: attributes.cpf,
            },
            RA: {
              contains: attributes.cpf,
            },
            createdAt: attributes.createdAt,
            modifiedAt: attributes.modifiedAt,
          },
          orderBy: {
            [orderAttribute]: orderType,
          },
        }),
        this.prismaClient.student.count({
          where: options.attributes,
        }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        items: students,
        page,
        pageSize,
        total,
        totalPages,
        order: {
          attribute: orderAttribute,
          type: orderType,
        },
      };
    } catch (e) {
      throw this.catchErrorHandler(e);
    }
  }

  async update(id: string, student: StudentUpdatableAttributes): Promise<Student> {
    try {
      const entity = await this.prismaClient.student.update({
        data: student,
        where: {
          id,
        },
      });

      return entity;
    } catch (e) {
      throw this.catchErrorHandler(e);
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
      throw this.catchErrorHandler(e);
    }
  }

  private catchErrorHandler(error: any) {
    this.logger.error(error);
    if (error?.constructor?.name === "PrismaClientKnownRequestError") {
      const validationErrors: {
        fieldName: string;
        messages: object;
      }[] = [];

      switch (error.code) {
        // UNIQUE constraint
        case "P2002": {
          const fields = (error.meta?.target as string[]) || ["unknown"];
          for (const field of fields) {
            validationErrors.push({
              fieldName: field,
              messages: {
                unique: `${field} is already registered in the system`,
              },
            });
          }
          break;
        }

        // FOREIGN KEY constraint
        case "P2003": {
          const field = String(error.meta?.field_name ?? "unknown");
          validationErrors.push({
            fieldName: field,
            messages: {
              foreignKey: `${field} references a non-existing entity`,
            },
          });
          break;
        }

        // Entity not found
        case "P2025": {
          validationErrors.push({
            fieldName: "id",
            messages: {
              notFound: "The requested entity was not found in the system",
            },
          });
          break;
        }
      }

      const appException = new BusinessRuleException({
        message: "Database business rule violation",
        validatioeErrors: validationErrors,
      });

      throw new AppHttpException(appException.message, 400, { ...appException.details });
    }

    throw new DatabaseException();
  }
}
