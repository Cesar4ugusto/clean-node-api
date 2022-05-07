import { AddLesson, Controller, HttpRequest, HttpResponse } from "./lesson-protocols";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, notFound, serverError } from "../../helpers/http-helper";

export class LessonController implements Controller {
    constructor(private readonly addLesson: AddLesson) {
        this.addLesson = addLesson;
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ["duration", "description"];

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError({ message: field }));
                }
            }

            const { duration, description } = httpRequest.body;

            if (httpRequest.body.duration <= 0) {
                return notFound(new InvalidParamError({ message: "duration" }));
            }

            this.addLesson.add({ description, duration });
        } catch (err) {
            return serverError();
        }
    }
}
