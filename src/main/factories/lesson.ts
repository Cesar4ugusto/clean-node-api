import { LessonController } from "@/presentation/controllers";
import { DbAddLesson } from "@/data/useCases";
import { LessonMongoRepository } from "@/infra/db";

export const makeLessonController = (): LessonController => {
    const lessonRepository = new LessonMongoRepository();
    const addLesson = new DbAddLesson(lessonRepository);
    return new LessonController(addLesson);
};
