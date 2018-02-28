import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {CommandDeclaration} from "./CommandDeclaration.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export class ProgramDeclaration implements IProgramDeclaration {

    private _name: string = null;

    private _description: string = null;

    private _version: string = null;

    private _versionOption: IOptionDeclaration = null;

    private _usage: string = null;

    private _options: IOptionDeclaration[] = [];

    private _commands: ICommandDeclaration[] = [];

    private _arguments: IArgumentDeclaration[] = [];

    constructor() {
        this.addOption(new OptionDeclaration({
            flags : "-h, --help",
            description : "Show help"
        }));
        this.addOption(new OptionDeclaration({
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
        this.addOption(this._versionOption);
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
        if (this.getOptions().length !== 0) {
            usage.push("[options...]");
        }
        if (this.getCommands().length !== 0) {
            const hasArguments: boolean = this.getCommands().filter((command: CommandDeclaration) => command.getArguments().length !== 0).length !== 0,
                  hasOptions: boolean   = this.getCommands().filter((command: CommandDeclaration) => command.getOptions().length !== 0).length !== 0;
            usage.push("<command>");
            if (hasArguments) {
                usage.push("[arguments...]");
            }
            if (hasOptions) {
                usage.push("[options...]");
            }
        } else if (this.getArguments().length !== 0) {
            for (const argument of this.getArguments()) {
                if (argument.isRequired()) {
                    usage.push("<" + argument.getName() + ">");
                } else if (!argument.isSpread()) {
                    usage.push("[" + argument.getName() + "]");
                } else {
                    usage.push("[" + argument.getName() + "...]");
                }
            }
        }
        return usage.join(" ");
    }

    addOption(option: IOptionDeclaration): void {
        for (const item of this._options) {
            const keys: string[] = [item.getShort(), item.getLong()].filter(Boolean);
            if (keys.indexOf(option.getShort()) !== -1 ||
                keys.indexOf(option.getLong()) !== -1) {
                let optionName: string = JSON.stringify("--" + option.getLong());
                if (option.getShort()) {
                    optionName += "(" + JSON.stringify("-" + option.getShort()) + ")";
                }
                throw new Error("You cannot declare not unique " + optionName + " option.");
            }
        }
        this._options.push(option);
    }

    setOptions(options: IOptionDeclaration[]): void {
        this._options = [];
        if (Array.isArray(options)) {
            for (const option of options) {
                this.addOption(option);
            }
        }
    }

    getOptions(): IOptionDeclaration[] {
        return this._options.slice();
    }

    addArgument(arg: IArgumentDeclaration): void {
        const hasOptional: boolean = this._arguments.filter((argument: IArgumentDeclaration) => argument.isOptional()).length !== 0,
              hasSpread: boolean   = this._arguments.filter((argument: IArgumentDeclaration) => argument.isSpread()).length !== 0;
        if (this._commands.length !== 0) {
            throw new Error("You cannot declare arguments with commands");
        }
        if (this._arguments.filter((item: IArgumentDeclaration) => item.getName() === arg.getName()).length !== 0) {
            throw new Error("You cannot declare not unique argument");
        }
        if (hasOptional) {
            throw new Error("You cannot declare arguments after optional");
        }
        if (hasSpread) {
            throw new Error("You cannot declare arguments after spread");
        }
        this._arguments.push(arg);

    }

    setArguments(args: IArgumentDeclaration[]): void {
        this._arguments = [];
        if (Array.isArray(args)) {
            for (const arg of args) {
                this.addArgument(arg);
            }
        }
    }

    getArguments(): IArgumentDeclaration[] {
        return this._arguments.slice();
    }

    addCommand(command: ICommandDeclaration): void {
        if (this._arguments.length !== 0) {
            throw new Error("You cannot declare commands with arguments");
        }
        for (const cmd of this._commands) {
            const keys: string[] = [cmd.getAlias(), cmd.getName()].filter(Boolean);
            if (keys.indexOf(command.getAlias()) !== -1 ||
                keys.indexOf(command.getName()) !== -1) {
                throw new Error("You cannot declare not unique command");
            }
        }
        this._commands.push(command);
    }

    setCommands(commands: ICommandDeclaration[]): void {
        this._commands = [];
        if (Array.isArray(commands)) {
            for (const command of commands) {
                this.addCommand(command);
            }
        }
    }

    getCommands(): ICommandDeclaration[] {
        return this._commands.slice();
    }

}
