import { AddLessonRepository } from "../../../../data/protocols/add-lesson-repository";
import { LessonModel } from "../../../../domain/models/Lesson";
import { AddLesson } from "../../../../domain/useCases/add-lesson";
import { MongoHelper } from "../helpers/mongo-helper";

export class LessonMongoRepository implements AddLessonRepository {
    async add(lessonData: AddLesson.Params): Promise<AddLesson.Result> {
        const LessonCollection = MongoHelper.getCollection("lesson");
        const lesson = await LessonCollection.insertOne(lessonData);
        return lesson !== null;
    }
}
