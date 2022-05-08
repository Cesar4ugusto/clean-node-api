import { AddLesson, AddLessonModel, LessonModel } from "./lesson-protocols";
import { InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { LessonController } from "./lesson";

const makeAddLesson = (): AddLesson => {
    class AddLessonStub implements AddLesson {
        async add(lesson: AddLessonModel): Promise<LessonModel> {
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
    it("should return 400 if no description is provider", async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
    });

    it("should return an error if no duration is provided", async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                description: "any_description",
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError({ message: "duration" }));
    });

    it("should return an error if no description is provided", async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                duration: 30,
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError({ message: "description" }));
    });

    it("should return 404 if duration validator throws", async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                description: "any_description",
                duration: -10,
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(404);
        expect(httpResponse.body).toEqual(new InvalidParamError({ message: "duration" }));
    });

    it("should call AddLesson with correct values", async () => {
        const { sut, addLessonStub } = makeSut();

        const addSpy = jest.spyOn(addLessonStub, "add");

        const httpRequest = {
            body: {
                description: "valid_description",
                duration: 10,
            },
        };
        await sut.handle(httpRequest);

        expect(addSpy).toHaveBeenCalledWith({ description: "valid_description", duration: 10 });
    });

    it("should returns 500 if AddLesson throws", async () => {
        const { sut, addLessonStub } = makeSut();

        jest.spyOn(addLessonStub, "add").mockImplementationOnce(() => {
            throw Promise.resolve(new Error());
        });

        const httpRequest = {
            body: {
                description: "valid_description",
                duration: 10,
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it("should returns 201 if valid data is provided", async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                description: "valid_description",
                duration: 10,
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(201);
        expect(httpResponse.body).toEqual({
            id: "valid_id",
            description: "valid_description",
            duration: 10,
        });
    });
});
