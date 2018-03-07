import {ICommand} from "./ICommand.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IListValuedOptions} from "./IListValuedOptions.ts";
import {IListValuedArguments} from "./IListValuedArguments.ts";

export interface ICommandValued
       extends ICommand<
           IListValuedOptions,
           IListValuedArguments
           > {
    getDeclaration(): ICommandDeclaration;
}
