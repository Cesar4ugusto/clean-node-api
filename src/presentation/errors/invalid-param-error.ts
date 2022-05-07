import { BaseErrorException, BaseErrorExceptionProps } from "./base-error-exception";

export class InvalidParamError extends BaseErrorException {
    constructor(error: BaseErrorExceptionProps) {
        super({
            code: "invalid_param",
            message: "Invalid param:" + error.message,
        });
        this.name = "MissingParamError";
    }
}
