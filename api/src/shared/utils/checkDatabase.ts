import { PrismaClient } from "@prisma/client";

export default async function checkDatabase(prisma: PrismaClient) {
  await prisma.$queryRaw`SELECT 1`;
}
