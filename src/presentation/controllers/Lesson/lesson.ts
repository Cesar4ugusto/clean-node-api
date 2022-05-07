export class LessonController {
    handle(httpRequest: any): any {
        if (!httpRequest.body.description) {
            return {
                statusCode: 400,
                body: new Error("Missing param: description"),
            };
        }

        if (!httpRequest.body.duration) {
            return {
                statusCode: 400,
                body: new Error("Missing param: duration"),
            };
        }
    }
}
