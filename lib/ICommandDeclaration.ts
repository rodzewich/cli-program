import {ICommand} from "./ICommand.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export interface ICommandDeclaration extends ICommand<IOptionDeclaration, IArgumentDeclaration> {
    addOption(option: IOptionDeclaration): void;
    addArgument(argument: IArgumentDeclaration): void;
    setAction(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void;
    getAction(): (args: {[key: string]: any}, opts: {[key: string]: any}) => void;
    setName(name: string): void;
    setAlias(alias: string): void;
    setUsage(usage: string): void;
    setDescription(description: string): void;
    setOptions(options: IOptionDeclaration[]): void;
    addOption(option: IOptionDeclaration): void;
    setArguments(args: IArgumentDeclaration[]): void;
    addArgument(arg: IArgumentDeclaration): void;
}
