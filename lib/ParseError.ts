export class ParseError extends Error {

    constructor(message: string) {
        super(message);
        this.name = "ParseError";
        this.message = message;
        Object.setPrototypeOf(this, ParseError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

}
