import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {CommandDeclaration} from "./CommandDeclaration.ts";
import {ListDeclarationOptions} from "./ListDeclarationOptions.ts";
import {IListDeclarationOptions} from "./IListDeclarationOptions.ts";
import {IListDeclarationArguments} from "./IListDeclarationArguments.ts";
import {ListDeclarationArguments} from "./ListDeclarationArguments.ts";
import {ListCommands} from "./ListCommands.ts";
import {IListCommands} from "./IListCommands.ts";
import kebabCase = require("lodash.kebabcase");
import {IArgument} from './IArgument.ts';

export class ProgramDeclaration implements IProgramDeclaration {

    private _name: string = null;

    private _description: string = null;

    private _version: string = null;

    private _versionOption: IOptionDeclaration = null;

    private _usage: string = null;

    private _options: IListDeclarationOptions = new ListDeclarationOptions();

    private commands: IListCommands = new ListCommands();

    private _arguments: IListDeclarationArguments = new ListDeclarationArguments();

    constructor() {
        this.getOptions()
            .addOption(new OptionDeclaration({
                flags : "-h, --help",
                description : "Show help"
            }));
        this.getOptions()
            .addOption(new OptionDeclaration({
                flags : "--color [value]",
                description : "Disable/enable output colors",
                negativePrefixes : ["no"]
            }));
    }

    setName(name: string): void {
        this._name = String(name || "") || null;
    }

    getName(): string {
        return this._name;
    }

    setDescription(description: string): void {
        this._description = String(description || "") || null;
    }

    getDescription(): string {
        return this._description;
    }

    setVersion(version: string, flags?: string, description?: string): void {
        this._version = version;
        this._versionOption = new OptionDeclaration({
            flags : flags || "-V, --version",
            description : description || "Show version."
        });
        this.getOptions()
            .addOption(this._versionOption);
    }

    getVersion(): string {
        return this._version
    }
    
    getVersionOption(): IOptionDeclaration {
        return this._versionOption || null;
    }

    setUsage(usage: string): void {
        this._usage = String(usage || "") || null;
    }

    getUsage(): string {
        const usage: string[] = [];
        if (this._usage) {
            return this._usage;
        }
        if (!this.getOptions().isEmpty()) {
            usage.push("[options...]");
        }
        if (!this.getCommands().isEmpty()) {
            usage.push("<command>");
            if (this.getCommands().hasArguments()) {
                usage.push("[arguments...]");
            }
            if (this.getCommands().hasOptions()) {
                usage.push("[options...]");
            }
        } else if (!this.getArguments().isEmpty()) {
            this.getArguments().forEach((argument: IArgument) => {
                if (argument.isRequired()) {
                    usage.push("<" + argument.getName() + ">");
                } else if (!argument.isSpread()) {
                    usage.push("[" + argument.getName() + "]");
                } else {
                    usage.push("[" + argument.getName() + "...]");
                }
            });
        }
        return usage.join(" ");
    }

    getOptions(): IListDeclarationOptions {
        return this._options;
    }

    getArguments(): IListDeclarationArguments {
        return this._arguments;
    }

    getCommands(): IListCommands {
        return this.commands;
    }

}
