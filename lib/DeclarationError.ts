export class DeclarationError extends Error {

    constructor(message: string) {
        super(message);
        this.name = "ParseError";
        this.message = message;
        Object.setPrototypeOf(this, DeclarationError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    
}
