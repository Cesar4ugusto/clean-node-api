import { HttpRequest, HttpResponse } from "./../../protocols/http";
export class LessonController {
    handle(httpRequest: HttpRequest): HttpResponse {
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
