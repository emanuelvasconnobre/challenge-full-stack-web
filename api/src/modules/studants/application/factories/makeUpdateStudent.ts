import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import UpdateStudent from "../use-cases/UpdateStudent";
import IStudentRepository from "../../domain/repositories/IStudentRepository";

export default function makeUpdateStudent(repository?: IStudentRepository) {
  const repo = repository ?? new PrismaStudentRepositoryImpl(prismaClient);
  return new UpdateStudent(repo);
}
