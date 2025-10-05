import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import UpdateStudent from "../use-cases/UpdateStudent";

export default function makeUpdateStudent() {
  const repository = new PrismaStudentRepositoryImpl(prismaClient);
  return new UpdateStudent(repository);
}
