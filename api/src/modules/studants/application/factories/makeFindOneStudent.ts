import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import FindOneStudent from "../use-cases/FindOneStudent";

export default function makeFindOneStudent() {
  const repository = new PrismaStudentRepositoryImpl(prismaClient);
  return new FindOneStudent(repository);
}
