import { MongoHelper } from "../helpers/mongo-helper";
import { LessonMongoRepository } from "./lesson";

describe("Lesson Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    it("should return an lesson on success", async () => {
        const sut = new LessonMongoRepository();

        const lesson = await sut.add({ description: "valid_description", duration: 10 });

        expect(lesson).toBeTruthy();
    });
});
