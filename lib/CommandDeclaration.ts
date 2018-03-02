import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";
import {ArgumentDeclaration} from "./ArgumentDeclaration.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {getFullOptionName} from "./utils.ts";
import kebabCase = require("lodash.kebabcase");

export class CommandDeclaration implements ICommandDeclaration {

    private _name: string = null;

    private _alias: string = null;

    private _usage: string = null;

    private _description: string = null;

    private _arguments: IArgumentDeclaration[] = [];

    private _options: IOptionDeclaration[] = [];

    private _action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void;

    constructor(command: string) {
        let matches: string[] = String(command || "")
            .match(/^([a-z][a-z0-9-]*)((?:\s<(?:[a-z][a-z0-9-]*)>|\s\[(?:[a-z][a-z0-9-]*)(?:\.\.\.)?\])*)$/i);
        if (matches === null) {
            throw new Error("Invalid command format");
        }
        this.setName(matches[1]);
        this.addOption(new OptionDeclaration({
            flags: "-h, --help",
            description: "Show help"
        }));
        matches[2].split(" ")
            .filter((value: string) => value !== "")
            .forEach((argument: string) => this.addArgument(new ArgumentDeclaration(argument)))
    }

    public setName(name: string): void {
        this._name = String(name || "") || null;
    }

    public getName(): string {
        return this._name;
    }

    public setAlias(alias: string): void {
        this._alias = String(alias || "") || null;
    }

    public getAlias(): string {
        return this._alias;
    }

    public setUsage(usage: string): void {
        this._usage = usage || "";
    }

    public getUsage(): string {
        const usage: string[] = [];
        if (this._usage) {
            return this._usage;
        }
        for (const argument of this.getArguments()) {
            if (argument.isRequired()) {
                usage.push("<" + argument.getName() + ">");
            } else if (!argument.isSpread()) {
                usage.push("[" + argument.getName() + "]");
            } else {
                usage.push("[" + argument.getName() + "...]");
            }
        }
        if (this.getOptions().length !== 0) {
            usage.push("[options...]");
        }
        return usage.join(" ");
    }

    public setDescription(description: string): void {
        this._description = String(description || "") || null;
    }

    public getDescription(): string {
        return this._description;
    }

    public addOption(option: IOptionDeclaration): void {
        const long: string  = option.getLong(),
              short: string = option.getShort(),
              negatives: string[] = option.getNegativePrefixes() || [];
        for (const item of this._options) {
            const negative: string[] = item.getNegativePrefixes() || [],
                  keys: string[] = [item.getShort(), item.getLong(), ...negative.map((prefix: string) => prefix + "-" + item.getLong())].filter(Boolean).map((key: string) => kebabCase(key));
            if (keys.indexOf(short) !== -1 ||
                keys.indexOf(kebabCase(long)) !== -1) {
                throw new Error("You cannot declare not unique " + getFullOptionName(option) + " option.");
            }
            for (const negative of negatives) {
                if (keys.indexOf(kebabCase(negative + "-" + long)) !== -1) {
                    throw new Error("You cannot declare not unique " + getFullOptionName(option) + " option due to negative prefix.");
                }
            }
        }
        this._options.push(option);
    }

    public setOptions(options: IOptionDeclaration[]): void {}

    public getOptions(): IOptionDeclaration[] {
        return this._options.slice();
    }

    public addArgument(argument: IArgumentDeclaration): void {
        const hasOptional: boolean = this._arguments.filter((argument: IArgumentDeclaration) => argument.isOptional()).length !== 0,
              hasSpread: boolean   = this._arguments.filter((argument: IArgumentDeclaration) => argument.isSpread()).length !== 0;
        if (this._arguments.filter((item: IArgumentDeclaration) => argument.getName() === item.getName()).length !== 0) {
            throw new Error("You cannot declare not unique argument");
        }
        if (hasOptional) {
            throw new Error("You cannot declare arguments after optional");
        }
        if (hasSpread) {
            throw new Error("You cannot declare arguments after spread");
        }
        this._arguments.push(argument);
    }

    public setArguments(args: IArgumentDeclaration[]): void {}

    public getArguments(): IArgumentDeclaration[] {
        return this._arguments.slice();
    }

    public setAction(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void {
        this._action = action || null;
    }

    public getAction(): (args: {[key: string]: any}, opts: {[key: string]: any}) => void {
        return this._action;
    }

}
