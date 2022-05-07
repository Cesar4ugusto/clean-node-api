import { BaseErrorException, BaseErrorExceptionProps } from "./base-error-exception";

export class MissingParamError extends BaseErrorException {
    constructor(error: BaseErrorExceptionProps) {
        super({
            code: "missing_param",
            message: "Missing param" + error.message,
        });
        this.name = "MissingParamError";
    }
}
