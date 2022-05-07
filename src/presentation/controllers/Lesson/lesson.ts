import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, notFound } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "./../../protocols/http";

export class LessonController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ["duration", "description"];

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError({ message: field }));
            }
        }

        if (httpRequest.body.duration <= 0) {
            return notFound(new InvalidParamError({ message: "duration" }));
        }
    }
}
