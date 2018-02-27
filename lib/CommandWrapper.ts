import {ICommandWrapper} from "./ICommandWrapper.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {showError, setCommandDeclaration, getCommandDeclaration} from "./utils.ts";

/**
 * User friendly command wrapper class.
 */
export class CommandWrapper implements ICommandWrapper {

    /**
     * Class constructor.
     * @param declaration Command declaration interface.
     */
    constructor(declaration: ICommandDeclaration) {
        setCommandDeclaration(this, declaration);
    }

    /**
     * Declare command alias.
     * @param alias Alias name.
     * @returns {CommandWrapper}
     */
    public alias(alias: string, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const declaration: ICommandDeclaration = getCommandDeclaration(this);
            if (!declaration) {
                throw new Error("Command declaration was removed!");
            }
            declaration.setAlias(alias);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare command usage format.
     * @param usage Usage format.
     * @returns {CommandWrapper}
     */
    public usage(usage: string, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const declaration: ICommandDeclaration = getCommandDeclaration(this);
            if (!declaration) {
                throw new Error("Command declaration was removed!");
            }
            declaration.setUsage(usage);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare command option.
     * @param flags Option flags.
     * @param description Option description.
     * @param defaultValue Option default value. Works only for optional options.
     * @param negativePrefixes List of negative prefixes for option.
     * @param preparationFunction Function for preparation option value.
     * @returns {CommandWrapper}
     */
    public option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const declaration: ICommandDeclaration = getCommandDeclaration(this);
            if (!declaration) {
                throw new Error("Command declaration was removed!");
            }
            declaration.addOption(new OptionDeclaration({flags, description, defaultValue, negativePrefixes, preparationFunction}));
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare command description.
     * @param description Command description.
     * @returns {CommandWrapper}
     */
    public description(description: string, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const declaration: ICommandDeclaration = getCommandDeclaration(this);
            if (!declaration) {
                throw new Error("Command declaration was removed!");
            }
            declaration.setDescription(description);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare command handler.
     * @param action Command handler.
     * @returns {CommandWrapper}
     */
    public action(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const declaration: ICommandDeclaration = getCommandDeclaration(this);
            if (!declaration) {
                throw new Error("Command declaration was removed!");
            }
            declaration.setAction(action);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

}
