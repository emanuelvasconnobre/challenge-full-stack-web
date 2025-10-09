import { PrismaClient } from "@prisma-app/client";

export type AppPrismaClient = PrismaClient;

const prismaClient = new PrismaClient();

export default prismaClient;
