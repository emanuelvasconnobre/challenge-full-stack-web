// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../../../../../generated/prisma";

export type AppPrismaClient = PrismaClient;

const prismaClient = new PrismaClient();

export default prismaClient;
