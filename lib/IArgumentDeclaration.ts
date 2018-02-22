import {IArgument} from "./IArgument.ts";

export interface IArgumentDeclaration extends IArgument {
    setName(name: string): void;
    setRequired(required: boolean): void;
    setOptional(optional: boolean): void;
    setSpread(spread: boolean): void;
}
