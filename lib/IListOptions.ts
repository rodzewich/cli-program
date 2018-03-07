import {IOption} from "./IOption.ts";

export interface IListOptions<O extends IOption> {
    addOption(option: O): void;
    findByShort(short: string): O;
    findByLong(long: string): O;
    forEach(callback: (value?: O, index?: number) => void): void;
    getCount(): number;
    isEmpty(): boolean;
}
