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

import request from "supertest";
import express from "express";
import { getPrismaTestClient } from "@/shared/infrastructure/db/prisma/prismaTestClient";
import studentRouter from "../../interfaces/http/student.routes";
import { clearDatabase } from "@/shared/utils/clearDatabase";

describe("StudentController (Integration)", () => {
  let app: express.Express;
  let prisma: Awaited<ReturnType<typeof getPrismaTestClient>>;

  let mockData = {
    id: undefined,
    name: "Test",
    email: "test@test.com",
    cpf: "321.515.243-61",
    RA: "2392993223",
  };

  beforeAll(async () => {
    prisma = await getPrismaTestClient();

    const mockModule = await import("@/shared/infrastructure/db/prisma/prismaClient");
    (mockModule as any).default = prisma;

    app = express();
    app.use(express.json());
    app.use("/students", studentRouter);
  });

  afterAll(async () => {
    await clearDatabase(prisma);
    await prisma.$disconnect();
  });

  it("should return 200 on GET /students", async () => {
    const response = await request(app).get("/students").send().expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return 201 on POST /students", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: mockData.name,
        email: mockData.email,
        cpf: mockData.cpf,
        RA: mockData.RA,
      })
      .expect(201);

    expect(response.body.name).toBe("Test");
    mockData.id = response.body.id;
  });

  it("should return 200 on GET /students/:id", async () => {
    const response = await request(app).get(`/students/${mockData.id}`).send().expect(200);

    expect(response.body.name).toBe("Test");
  });

  it("should return 200 on PUT /students/:id", async () => {
    const newEmail = `updated+${mockData.email}`;

    const response = await request(app)
      .put(`/students/${mockData.id}`)
      .send({
        email: newEmail,
      })
      .expect(200);

    expect(response.body.email).toBe(newEmail);
  });

  it("should return 200 on DELETE /students/:id", async () => {
    const response = await request(app).delete(`/students/${mockData.id}`).send().expect(200);

    expect(response.body).toBe("");
  });
});
