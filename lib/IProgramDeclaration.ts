import {IProgram} from "./IProgram.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IListDeclarationOptions} from "./IListDeclarationOptions.ts";
import {IListDeclarationArguments} from "./IListDeclarationArguments.ts";
import {IListCommands} from "./IListCommands.ts";

export interface IProgramDeclaration
       extends IProgram<
           IListDeclarationOptions,
           IListDeclarationArguments,
           ICommandDeclaration
           > {
    setName(name: string): void;
    setDescription(description: string): void;
    setVersion(version: string, flags?: string, description?: string): void;
    setUsage(usage: string): void;
    getCommands(): IListCommands;
}
