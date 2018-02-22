import {IProgram} from "./IProgram.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";

export interface IProgramDeclaration extends IProgram<IOptionDeclaration, IArgumentDeclaration, ICommandDeclaration> {
    setName(name: string): void;
    setDescription(description: string): void;
    setVersion(version: string): void;
    setUsage(usage: string): void;
    setOptions(options: IOptionDeclaration[]): void;
    addOption(option: IOptionDeclaration): void;
    setCommands(commands: ICommandDeclaration[]): void;
    addCommand(command: ICommandDeclaration): void;
    setArguments(args: IArgumentDeclaration[]): void;
    addArgument(arg: IArgumentDeclaration): void;
}
