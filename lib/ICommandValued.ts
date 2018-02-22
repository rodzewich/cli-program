import {ICommand} from "./ICommand.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {IArgumentValued} from "./IArgumentValued.ts";

export interface ICommandValued extends ICommand<IOptionValued, IArgumentValued> {
    getDeclaration(): ICommandDeclaration;
}
