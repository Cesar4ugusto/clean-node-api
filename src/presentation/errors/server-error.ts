import { BaseErrorException, BaseErrorExceptionProps } from "./base-error-exception";

export class ServerError extends Error {
    constructor() {
        super("Internal server error");
        this.name = "ServerError";
    }
}
