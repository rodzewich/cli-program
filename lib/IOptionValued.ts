import {IOption} from "./IOption.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";

export interface IOptionValued extends IOption {
    getAttribute(): string;
    getDeclaration(): IOptionDeclaration;
    getValue(): any;
}
