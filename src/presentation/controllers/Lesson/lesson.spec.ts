import { LessonController } from "./lesson";

describe("Lesson Controller", () => {
    it("should return 400 if no description is provider", () => {
        const sut = new LessonController();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
    });
});
