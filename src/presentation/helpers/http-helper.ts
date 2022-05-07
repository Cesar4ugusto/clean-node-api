import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error,
});

export const notFound = (error: Error): HttpResponse => ({
    statusCode: 404,
    body: error,
});
