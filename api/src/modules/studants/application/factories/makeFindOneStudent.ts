import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import FindOneStudent from "../use-cases/FindOneStudent";
import IStudentRepository from "../../domain/repositories/IStudentRepository";

export default function makeFindOneStudent(repository?: IStudentRepository) {
  const repo = repository ?? new PrismaStudentRepositoryImpl(prismaClient);
  return new FindOneStudent(repo);
}
