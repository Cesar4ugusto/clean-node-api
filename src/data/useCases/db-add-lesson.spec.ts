import { DbAddLesson } from "./db-add-lesson";
import { AddLessonRepository } from "../protocols";
import { AddLesson } from "@/domain/useCases";

const makeAddLessonRepository = (): AddLessonRepository => {
    class AddLessonRepositoryStub implements AddLessonRepository {
        async add(lessonData: AddLesson.Params): Promise<AddLesson.Result> {
            const fakeLesson = {
                id: "valid_id",
                description: "valid_description",
                duration: 10,
            };

            return Promise.resolve(fakeLesson) !== null;
        }
    }

    return new AddLessonRepositoryStub();
};

type SutTypes = {
    sut: DbAddLesson;
    addLessonRepositoryStub: AddLessonRepository;
};

const makeSut = (): SutTypes => {
    const addLessonRepositoryStub = makeAddLessonRepository();
    const sut = new DbAddLesson(addLessonRepositoryStub);

    return { sut, addLessonRepositoryStub };
};

describe("DbLesson UseCase", () => {
    it("should call AddLessonRepository with correct values", async () => {
        const { sut, addLessonRepositoryStub } = makeSut();

        const addSpy = jest.spyOn(addLessonRepositoryStub, "add");

        const lessonData = {
            description: "valid_description",
            duration: 10,
        };

        await sut.add(lessonData);

        expect(addSpy).toHaveBeenCalledWith({
            description: "valid_description",
            duration: 10,
        });
    });

    it("should throw if AddLessonRepository throws", async () => {
        const { sut, addLessonRepositoryStub } = makeSut();

        jest.spyOn(addLessonRepositoryStub, "add").mockReturnValueOnce(Promise.reject(new Error()));

        const lessonData = {
            description: "valid_description",
            duration: 10,
        };

        const promise = sut.add(lessonData);

        expect(promise).rejects.toThrow();
    });

    it("should return an lesson on success", async () => {
        const { sut } = makeSut();

        const lessonData = {
            description: "valid_description",
            duration: 10,
        };

        const lesson = await sut.add(lessonData);

        expect(lesson).toBeTruthy();
    });
});
