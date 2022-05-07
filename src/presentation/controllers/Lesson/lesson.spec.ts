import { MissingParamError } from "../../errors/missing-param-error";
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

    it("should return an error if no duration is provided", () => {
        const sut = new LessonController();

        const httpRequest = {
            body: {
                description: "any_description",
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError({ message: "duration" }));
    });

    it("should return an error if no description is provided", () => {
        const sut = new LessonController();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError({ message: "description" }));
    });
});
