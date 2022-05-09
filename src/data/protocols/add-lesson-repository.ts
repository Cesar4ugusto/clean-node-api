import { AddLesson } from "../../domain/useCases/add-lesson";
import { LessonModel } from "../../domain/models/Lesson";

export interface AddLessonRepository {
    add(lessonData: AddLesson.Params): Promise<AddLesson.Result>;
}
