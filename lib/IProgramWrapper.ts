import {ICommandWrapper} from "./ICommandWrapper.ts";

export interface IProgramWrapper {
    name(name: string): IProgramWrapper;
    version(version: string, flags?: string, description?: string): IProgramWrapper;
    description(description: string): IProgramWrapper;
    usage(usage: string): IProgramWrapper;
    option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): IProgramWrapper;
    command(command: string): ICommandWrapper;
    arguments(args: string): IProgramWrapper;
    parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void;
}
