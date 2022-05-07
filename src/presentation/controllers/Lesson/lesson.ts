import { AddLesson } from "../../../domain/useCases/add-lesson";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, notFound, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "./../../protocols/http";

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
