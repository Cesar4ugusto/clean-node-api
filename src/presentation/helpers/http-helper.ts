import { BaseErrorException } from "../errors/base-error-exception";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: BaseErrorException): HttpResponse => ({
    statusCode: 400,
    body: error,
});
