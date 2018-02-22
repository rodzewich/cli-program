import {IArgument} from "./IArgument.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export interface IArgumentValued extends IArgument {
    getDeclaration(): IArgumentDeclaration;
    getValue(): void;
}
