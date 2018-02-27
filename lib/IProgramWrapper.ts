import {ICommandWrapper} from "./ICommandWrapper.ts";

/**
 * User friendly program interface.
 */
export interface IProgramWrapper {

    /**
     * Declare program name.
     * @param name Program name.
     */
    name(name: string): IProgramWrapper;

    /**
     * Declare program version.
     * @param version Program version.
     * @param flags Flags format.
     * @param description Flags description.
     */
    version(version: string, flags?: string, description?: string): IProgramWrapper;

    /**
     * Declare program description.
     * @param description Program description.
     */
    description(description: string): IProgramWrapper;

    /**
     * Declare program usage format.
     * @param usage Usage format.
     */
    usage(usage: string): IProgramWrapper;

    /**
     * Declare program option.
     * @param flags Option flags.
     * @param description Option description.
     * @param defaultValue Option default value. Works only for optional options.
     * @param negativePrefixes List of negative prefixes for option.
     * @param preparationFunction Function for preparation option value.
     */
    option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): IProgramWrapper;

    /**
     * Declare program command.
     * @param command Command name.
     */
    command(command: string): ICommandWrapper;

    /**
     * Declare program arguments.
     * @param args Program arguments.
     */
    arguments(args: string): IProgramWrapper;

    /**
     * Start parsing process.
     * @param action Program default handler. Not needed if any command was declared.
     * @param argv Command line arguments.
     */
    parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void, argv?: string[]): void;

}
