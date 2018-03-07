import {ICommandDeclaration} from "./ICommandDeclaration.ts";

export interface IListCommands {
    addCommand(command: ICommandDeclaration): void;
    forEach(callback: (value?: ICommandDeclaration, index?: number) => void): void;
    getCount(): number;
    findByName(name: string): ICommandDeclaration;
    findByAlias(name: string): ICommandDeclaration;
    hasArguments(): boolean;
    hasOptions(): boolean;
    isEmpty(): boolean;
}