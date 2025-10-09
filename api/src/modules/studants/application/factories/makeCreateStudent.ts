import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import CreateStudent from "../use-cases/CreateStudent";
import IStudentRepository from "../../domain/repositories/IStudentRepository";

export default function makeCreateStudent(repository?: IStudentRepository) {
  const repo = repository ?? new PrismaStudentRepositoryImpl(prismaClient);
  return new CreateStudent(repo);
}
