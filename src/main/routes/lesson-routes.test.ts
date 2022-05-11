import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "@/infra/db/mongodb/mongo-helper";

describe("Lesson Routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        const collection = MongoHelper.getCollection("lessons");
        await collection.deleteMany({});
    });

    it("should return an lesson on success", async () => {
        await request(app).post("/api/lesson").send({ description: "test", duration: 10 }).expect(201);
    });
});
