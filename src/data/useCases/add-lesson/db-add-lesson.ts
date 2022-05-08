import { AddLessonModel, AddLessonRepository, LessonModel } from "./db-add-lesson-protocols";

export class DbAddLesson implements AddLessonRepository {
    constructor(private readonly addLessonRepository: AddLessonRepository) {
        this.addLessonRepository = addLessonRepository;
    }

    async add(lessonData: AddLessonModel): Promise<LessonModel> {
        await this.addLessonRepository.add(lessonData);
        return Promise.resolve(null);
    }
}