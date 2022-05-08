import { DbAddLesson } from "./db-add-lesson";
import { AddLessonModel, AddLessonRepository, LessonModel } from "./db-add-lesson-protocols";

const makeAddLessonRepository = (): AddLessonRepository => {
    class AddLessonRepositoryStub implements AddLessonRepository {
        async add(lessonData: AddLessonModel): Promise<LessonModel> {
            const fakeLesson = {
                id: "valid_id",
                description: "valid_description",
                duration: 10,
            };

            return Promise.resolve(fakeLesson);
        }
    }

    return new AddLessonRepositoryStub();
};

interface SutTypes {
    sut: DbAddLesson;
    addLessonRepositoryStub: AddLessonRepository;
}

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
});
