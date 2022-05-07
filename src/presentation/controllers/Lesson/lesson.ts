import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "./../../protocols/http";
export class LessonController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ["duration", "description"];

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError({ message: field }));
            }
        }
    }
}
