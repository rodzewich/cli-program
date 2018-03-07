import {IArgument} from "./IArgument.ts";

export interface IListArguments<A extends IArgument> {
    addArgument(argument: A): void;
    forEach(callback: (value?: A, index?: number) => void): void;
    getCount(): number;
    findByIndex(index: number): A;
    findByName(name: string): A;
    getCountOfRequired(): number;
    isEmpty(): boolean;
}