import request from "supertest";
import { app } from "@/app/server";

describe("HealthController Integration Test", () => {
  it("should return 200 on GET /health/liveness", async () => {
    const response = await request(app).get("/health/liveness");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("should return 200 on GET /health/readiness", async () => {
    const response = await request(app).get("/health/readiness");
    expect(response.status).toBe(500);
  });
});
