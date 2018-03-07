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

    private name: string = null;

    private description: string = null;

    private version: string = null;

    private versionOption: IOptionDeclaration = null;

    private usage: string = null;

    private options: IListDeclarationOptions = new ListDeclarationOptions();

    private commands: IListCommands = new ListCommands();

    private arguments: IListDeclarationArguments = new ListDeclarationArguments();

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
        this.name = String(name || "") || null;
    }

    getName(): string {
        return this.name;
    }

    setDescription(description: string): void {
        this.description = String(description || "") || null;
    }

    getDescription(): string {
        return this.description;
    }

    setVersion(version: string, flags?: string, description?: string): void {
        this.version = version;
        this.versionOption = new OptionDeclaration({
            flags : flags || "-V, --version",
            description : description || "Show version."
        });
        this.getOptions()
            .addOption(this.versionOption);
    }

    getVersion(): string {
        return this.version
    }
    
    getVersionOption(): IOptionDeclaration {
        return this.versionOption || null;
    }

    setUsage(usage: string): void {
        this.usage = String(usage || "") || null;
    }

    getUsage(): string {
        const usage: string[] = [];
        if (this.usage) {
            return this.usage;
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
        return this.options;
    }

    getArguments(): IListDeclarationArguments {
        return this.arguments;
    }

    getCommands(): IListCommands {
        return this.commands;
    }

}
