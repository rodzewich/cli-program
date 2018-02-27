/**
 * User friendly command wrapper interface.
 */
export interface ICommandWrapper {

    /**
     * Declare command alias.
     * @param alias Alias name.
     */
    alias(alias: string): ICommandWrapper;

    /**
     * Declare command usage format.
     * @param usage Usage format.
     */
    usage(usage: string): ICommandWrapper;

    /**
     * Declare command option.
     * @param flags Option flags.
     * @param description Option description.
     * @param defaultValue Option default value. Works only for optional options.
     * @param negativePrefixes List of negative prefixes for option.
     * @param preparationFunction Function for preparation option value.
     */
    option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): ICommandWrapper;

    /**
     * Declare command description.
     * @param description Command description.
     */
    description(description: string): ICommandWrapper;

    /**
     * Declare command handler.
     * @param action Command handler.
     */
    action(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): ICommandWrapper;
    
}
