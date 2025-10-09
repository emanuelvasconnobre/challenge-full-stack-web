import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import FindManyStudent from "../use-cases/FindManyStudent";
import IStudentRepository from "../../domain/repositories/IStudentRepository";

export default function makeFindManyStudent(repository?: IStudentRepository) {
  const repo = repository ?? new PrismaStudentRepositoryImpl(prismaClient);
  return new FindManyStudent(repo);
}
