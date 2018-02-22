import {IProgram} from "./IProgram.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {IArgumentValued} from "./IArgumentValued.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";

export interface IProgramValued extends IProgram<IOptionValued, IArgumentValued, ICommandValued> {
    getDeclaration(): IProgramDeclaration;
}
