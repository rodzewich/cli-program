import {IProgram} from "./IProgram.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {IListValuedOptions} from "./IListValuedOptions.ts";
import {IListValuedArguments} from "./IListValuedArguments.ts";

export interface IProgramValued extends IProgram<IListValuedOptions, IListValuedArguments, ICommandValued> {
    setCommand(command: ICommandValued): void;
    getCommand(): ICommandValued;
    getDeclaration(): IProgramDeclaration;
}
