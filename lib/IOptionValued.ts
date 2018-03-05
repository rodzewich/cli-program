import {IOption} from "./IOption.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";

export interface IOptionValued extends IOption {
    getAttribute(): string;
    getOriginal(): string;
    getDeclaration(): IOptionDeclaration;
    isNegative(): boolean;
    getValue(): any;
    setValue(value: any): void;
}
