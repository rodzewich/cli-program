import {IOption} from "./IOption.ts";
import {IArgument} from "./IArgument.ts";

export interface ICommand<O extends IOption, A extends IArgument> {
    getName(): string;
    getAlias(): string;
    getUsage(): string;
    getDescription(): string;
    getOptions(): O[];
    getArguments(): A[];
}
