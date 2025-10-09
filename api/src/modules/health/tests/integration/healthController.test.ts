import PrismaTestDBClientException from "@/shared/infrastructure/exceptions/PrismaTestDBClientException";

jest.mock("@/shared/infrastructure/db/prisma/prismaClient", () => {
  try {
    return {
      __esModule: true,
      default: new (require("@prisma-test/client")?.PrismaClient ?? null)(),
    };
  } catch (e) {
    console.log(e);
    throw new PrismaTestDBClientException();
  }
});

import express from "express";
import request from "supertest";
import { getPrismaTestClient } from "@/shared/infrastructure/db/prisma/prismaTestClient";
import healthRouter from "../../interfaces/http/health.routes";

describe("HealthController (Integration)", () => {
  let app: express.Express;
  let prisma: Awaited<ReturnType<typeof getPrismaTestClient>>;

  beforeAll(async () => {
    prisma = await getPrismaTestClient();

    const mockModule = await import("@/shared/infrastructure/db/prisma/prismaClient");
    (mockModule as any).default = prisma;

    app = express();
    app.use(express.json());
    app.use("/health", healthRouter);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 200 on GET /health/liveness", async () => {
    const response = await request(app).get("/health/liveness");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("should return 200 on GET /health/readiness", async () => {
    const response = await request(app).get("/health/readiness");
    expect(response.status).toBe(200);
  });

  it("should return 503 on GET /health/readiness when database is not up", async () => {
    jest.spyOn(prisma, "$queryRaw").mockRejectedValueOnce(new Error("DB down"));

    const response = await request(app).get("/health/readiness");
    expect(response.status).toBe(503);
  });
});
