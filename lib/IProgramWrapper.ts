import {ICommandWrapper} from "./ICommandWrapper.ts";

export interface IProgramWrapper {
    name(name: string): IProgramWrapper;
    version(version: string): IProgramWrapper;
    description(description: string): IProgramWrapper;
    usage(usage: string): IProgramWrapper;
    option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): IProgramWrapper;
    command(command: string): ICommandWrapper;
    parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void;
}