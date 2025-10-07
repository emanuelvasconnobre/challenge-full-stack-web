import { PrismaClient } from "@prisma/client";

export async function clearDatabase(prisma: PrismaClient) {
  const tablenames = await prisma.$queryRaw<Array<{ name: string }>>`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `;

  for (const { name } of tablenames) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
  }
}
