import {IOption} from "./IOption.ts";
import {IArgument} from "./IArgument.ts";
import {ICommand} from "./ICommand.ts";

export interface IProgram<O extends IOption, A extends IArgument, C extends ICommand<O, A>> {
    getName(): string;
    getDescription(): string;
    getVersion(): string;
    getUsage(): string;
    getOptions(): O[];
    getCommands(): C[];
    getArguments(): A[];
}
