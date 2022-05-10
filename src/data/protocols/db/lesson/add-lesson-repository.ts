import { AddLesson } from "@/domain/useCases";

export interface AddLessonRepository {
    add(lessonData: AddLesson.Params): Promise<AddLesson.Result>;
}
