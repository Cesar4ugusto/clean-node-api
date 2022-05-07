import { LessonModel } from "../../../domain/models/Lesson";
import { AddLesson, AddLessonModel } from "../../../domain/useCases/add-lesson";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { LessonController } from "./lesson";

const makeAddLesson = (): AddLesson => {
    class AddLessonStub implements AddLesson {
        add(lesson: AddLessonModel): LessonModel {
            const fakeLesson = {
                id: "valid_id",
                description: "valid_description",
                duration: 10,
            };

            return fakeLesson;
        }
    }

    return new AddLessonStub();
};

interface SutTypes {
    sut: LessonController;
    addLessonStub: AddLesson;
}

const makeSut = (): SutTypes => {
    const addLessonStub = makeAddLesson();
    const sut = new LessonController(addLessonStub);
    return { sut, addLessonStub };
};

describe("Lesson Controller", () => {
    it("should return 400 if no description is provider", () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
    });

    it("should return an error if no duration is provided", () => {
        const { sut } = makeSut();

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
        const { sut } = makeSut();

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
        const { sut } = makeSut();

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

    it("should call AddLesson with correct values", () => {
        const { sut, addLessonStub } = makeSut();

        const addSpy = jest.spyOn(addLessonStub, "add");

        const httpRequest = {
            body: {
                description: "valid_description",
                duration: 10,
            },
        };
        sut.handle(httpRequest);

        expect(addSpy).toHaveBeenCalledWith({ description: "valid_description", duration: 10 });
    });

    it("should returns 500 if AddLesson throws", () => {
        const { sut, addLessonStub } = makeSut();

        jest.spyOn(addLessonStub, "add").mockImplementationOnce(() => {
            throw new Error();
        });

        const httpRequest = {
            body: {
                description: "valid_description",
                duration: 10,
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });
});
