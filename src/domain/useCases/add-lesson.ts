import { LessonModel } from "./../models/Lesson";

export interface AddLessonModel {
    description: string;
    duration: number;
}

export interface AddLesson {
    add(lesson: AddLessonModel): Promise<LessonModel>;
}
