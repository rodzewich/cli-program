import {IListOptions} from "./IListOptions.ts";
import {IListArguments} from "./IListArguments.ts";

export interface ICommand<
    O extends IListOptions<any>,
    A extends IListArguments<any>
    > {
    getName(): string;
    getAlias(): string;
    getFull(): string;
    getUsage(): string;
    getDescription(): string;
    getOptions(): O;
    getArguments(): A;
}
