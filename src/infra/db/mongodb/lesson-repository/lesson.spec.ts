import { MongoHelper } from "../helpers/mongo-helper";
import { LessonMongoRepository } from "./lesson";

const makeSut = (): LessonMongoRepository => {
    return new LessonMongoRepository();
};

describe("Lesson Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    it("should return an lesson on success", async () => {
        const sut = makeSut();

        const lesson = await sut.add({ description: "valid_description", duration: 10 });

        expect(lesson).toBeTruthy();
    });
});
