import { ServerError } from "../errors/server-error";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error,
});

export const notFound = (error: Error): HttpResponse => ({
    statusCode: 404,
    body: error,
});

export const serverError = (): HttpResponse => ({
    statusCode: 404,
    body: new ServerError(),
});
