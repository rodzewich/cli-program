import {IListOptions} from "./IListOptions.ts";
import {IListArguments} from "./IListArguments.ts";
import {ICommand} from "./ICommand.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";

export interface IProgram <
    O extends IListOptions<any>,
    A extends IListArguments<any>,
    C extends ICommand<O, A>
    > {
    getName(): string;
    getDescription(): string;
    getVersion(): string;
    getVersionOption(): IOptionDeclaration;
    getUsage(): string;
    getOptions(): O;
    getArguments(): A;
}
