import { AddLessonRepository } from "@/data/protocols";
import { AddLesson } from "@/domain/useCases";
import { MongoHelper } from "./mongo-helper";

export class LessonMongoRepository implements AddLessonRepository {
    async add(lessonData: AddLesson.Params): Promise<AddLesson.Result> {
        const LessonCollection = MongoHelper.getCollection("lessons");
        const lesson = await LessonCollection.insertOne(lessonData);
        return lesson !== null;
    }
}
