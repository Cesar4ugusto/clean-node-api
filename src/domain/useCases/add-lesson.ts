import { LessonModel } from "./../models/Lesson";

export interface AddLesson {
    add(lesson: AddLesson.Params): Promise<AddLesson.Result>;
}

export namespace AddLesson {
    export type Params = {
        description: string;
        duration: number;
    };

    export type Result = boolean;
}
