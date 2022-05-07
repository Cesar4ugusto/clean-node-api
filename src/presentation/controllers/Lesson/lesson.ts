import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "./../../protocols/http";
export class LessonController {
    handle(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.description) {
            return badRequest(new MissingParamError({ message: "description" }));
        }

        if (!httpRequest.body.duration) {
            return badRequest(new MissingParamError({ message: "duration" }));
        }
    }
}
