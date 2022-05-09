import { AddLesson, AddLessonRepository, LessonModel } from "./db-add-lesson-protocols";

export class DbAddLesson implements AddLessonRepository {
    constructor(private readonly addLessonRepository: AddLessonRepository) {
        this.addLessonRepository = addLessonRepository;
    }

    async add(lessonData: AddLesson.Params): Promise<AddLesson.Result> {
        const lesson = await this.addLessonRepository.add(lessonData);
        console.log(lesson);
        return lesson;
    }
}
