import { AddLessonModel } from "../../domain/useCases/add-lesson";
import { LessonModel } from "../../domain/models/Lesson";

export interface AddLessonRepository {
    add(lessonData: AddLessonModel): Promise<LessonModel>;
}
