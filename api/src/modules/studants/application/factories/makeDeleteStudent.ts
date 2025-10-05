import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import DeleteStudent from "../use-cases/DeleteStudent";

export default function makeDeleteStudent() {
  const repository = new PrismaStudentRepositoryImpl(prismaClient);
  return new DeleteStudent(repository);
}
