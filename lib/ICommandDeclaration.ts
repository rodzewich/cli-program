import {ICommand} from "./ICommand.ts";
import {IListDeclarationOptions} from "./IListDeclarationOptions.ts";
import {IListDeclarationArguments} from "./IListDeclarationArguments.ts";

export interface ICommandDeclaration
       extends ICommand<
           IListDeclarationOptions,
           IListDeclarationArguments
           > {
    setAction(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void;
    getAction(): (args: {[key: string]: any}, opts: {[key: string]: any}) => void;
    setName(name: string): void;
    setAlias(alias: string): void;
    setUsage(usage: string): void;
    setDescription(description: string): void;
}
