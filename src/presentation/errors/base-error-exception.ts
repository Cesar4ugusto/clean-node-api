export interface BaseErrorExceptionProps {
    code?: string;
    message: string;
}

export abstract class BaseErrorException extends Error {
    protected constructor(error: BaseErrorExceptionProps) {
        super(error ? JSON.stringify(error) : "Internal server error");
    }
}
