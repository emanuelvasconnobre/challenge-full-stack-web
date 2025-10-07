import PrismaTestDBClientException from "../../exceptions/PrismaTestDBClientException";

export async function getPrismaTestClient() {
  const module = await import("@prisma-test/client").catch(() => null);
  if (!module) throw new PrismaTestDBClientException();

  return new module.PrismaClient();
}
