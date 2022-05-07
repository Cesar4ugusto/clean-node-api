import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { LessonController } from "./lesson";

const makeSut = (): LessonController => {
    return new LessonController();
};

describe("Lesson Controller", () => {
    it("should return 400 if no description is provider", () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
    });

    it("should return an error if no duration is provided", () => {
        const sut = makeSut();

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
        const sut = makeSut();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError({ message: "description" }));
    });

    it("should return 404 if duration validator throws", () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                description: "any_description",
                duration: -10,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(404);
        expect(httpResponse.body).toEqual(new InvalidParamError({ message: "duration" }));
    });
});
