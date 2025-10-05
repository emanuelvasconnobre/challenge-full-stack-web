import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import FindManyStudent from "../use-cases/FindManyStudent";

export default function makeFindManyStudent() {
  const repository = new PrismaStudentRepositoryImpl(prismaClient);
  return new FindManyStudent(repository);
}
