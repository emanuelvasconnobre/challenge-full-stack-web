import prismaClient from "@/shared/infrastructure/db/prisma/prismaClient";
import PrismaStudentRepositoryImpl from "../../infrastructure/db/prisma/PrismaStudentRepositoryImpl";
import CreateStudent from "../use-cases/CreateStudent";

export default function makeCreateStudent() {
  const repository = new PrismaStudentRepositoryImpl(prismaClient);
  return new CreateStudent(repository);
}
