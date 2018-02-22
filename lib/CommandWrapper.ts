import {ICommandWrapper} from "./ICommandWrapper.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {showError} from "./utils.ts";

export class CommandWrapper implements ICommandWrapper {

    private _declaration: ICommandDeclaration = null;

    constructor(declaration: ICommandDeclaration) {
        this._declaration = declaration;
    }

    public alias(alias: string): ICommandWrapper {
        try {
            this._declaration.setAlias(alias);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public usage(usage: string): ICommandWrapper {
        try {
            this._declaration.setUsage(usage);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): ICommandWrapper {
        try {
            this._declaration.addOption(new OptionDeclaration({flags, description, defaultValue, negativePrefixes, preparationFunction}));
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public description(description: string): ICommandWrapper {
        try {
            this._declaration.setDescription(description);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public action(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): ICommandWrapper {
        try {
            this._declaration.setAction(action);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

}
