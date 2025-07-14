import request from "supertest";
import app from "../server.js";

describe("Class Routes", () => {
  it("should return status 200 for GET", async () => {
    const res = await request(app).get("/api/classes/grade1");
    expect(res.statusCode).toBe(200);
  });
});
