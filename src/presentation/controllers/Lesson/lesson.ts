import { MissingParamError } from "../../errors/missing-param-error";
import { HttpRequest, HttpResponse } from "./../../protocols/http";
export class LessonController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.description) {
            return {
                statusCode: 400,
                body: new MissingParamError({ message: "description" }),
            };
        }

        if (!httpRequest.body.duration) {
            return {
                statusCode: 400,
                body: new MissingParamError({ message: "duration" }),
            };
        }
    }
}
