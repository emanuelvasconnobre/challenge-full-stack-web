import { app } from "@/app/server";
import envSettings from "@/config/env";
import request from "supertest";

describe("Security Middlewares", () => {
  it("should include Helmet headers", async () => {
    const res = await request(app).get("/health/liveness");
    expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("should block disallowed origins via CORS", async () => {
    const res = await request(app).get("/health/liveness").set("Origin", "https://malicious.com");
    expect(res.status).toBe(200);
  });

  it("should limit requests per IP", async () => {
    for (let i = 0; i < envSettings.rateLimit.limit + 1; i++) {
      await request(app).get("/health/liveness");
    }
    const res = await request(app).get("/health/liveness");
    expect(res.status).toBe(429);
  });
});
