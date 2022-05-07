export class LessonController {
    handle(httpRequest: any): any {
        return {
            statusCode: 400,
            body: new Error("Missing duration on request body"),
        };
    }
}
