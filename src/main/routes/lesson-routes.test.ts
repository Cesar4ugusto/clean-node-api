import request from "supertest";
import app from "../config/app";

describe("Lesson Routes", () => {
    it("should return an lesson on success", async () => {
        await request(app).post("/api/lesson").send({ description: "test", duration: 10 }).expect(200);
    });
});
