import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import DeleteStudent from "../use-cases/DeleteStudent";
import IStudentRepository from "../../domain/repositories/IStudentRepository";

export default function makeDeleteStudent(repository?: IStudentRepository) {
  const repo = repository ?? new PrismaStudentRepositoryImpl(prismaClient);
  return new DeleteStudent(repo);
}
