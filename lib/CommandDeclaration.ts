import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {ArgumentDeclaration} from "./ArgumentDeclaration.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {IListDeclarationOptions} from "./IListDeclarationOptions.ts";
import {ListDeclarationOptions} from "./ListDeclarationOptions.ts";
import {IListDeclarationArguments} from './IListDeclarationArguments.ts';
import {ListDeclarationArguments} from './ListDeclarationArguments.ts';
import kebabCase = require("lodash.kebabcase");
import {IArgument} from './IArgument.ts';

export class CommandDeclaration implements ICommandDeclaration {

    private name: string = null;

    private alias: string = null;

    private usage: string = null;

    private description: string = null;

    private arguments: IListDeclarationArguments = new ListDeclarationArguments();

    private options: IListDeclarationOptions = new ListDeclarationOptions();

    private action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void = null;

    constructor(command: string) {
        let matches: string[] = String(command || "")
            .match(/^([a-z][a-z0-9-]*)((?:\s<(?:[a-z][a-z0-9-]*)>|\s\[(?:[a-z][a-z0-9-]*)(?:\.\.\.)?\])*)$/i);
        if (matches === null) {
            throw new Error("Invalid command format");
        }
        this.setName(matches[1]);
        this.getOptions().addOption(new OptionDeclaration({
            flags: "-h, --help",
            description: "Show help"
        }));
        matches[2].split(" ")
            .filter((value: string) => value !== "")
            .forEach((argument: string) => this.getArguments().addArgument(new ArgumentDeclaration(argument)))
    }

    public setName(name: string): void {
        this.name = String(name || "") || null;
    }

    public getName(): string {
        return this.name;
    }

    public setAlias(alias: string): void {
        this.alias = String(alias || "") || null;
    }

    public getAlias(): string {
        return this.alias;
    }

    public setUsage(usage: string): void {
        this.usage = usage || "";
    }

    public getFull(): string {
        const name: string = this.getName();
        const alias: string = this.getAlias();
        if (!alias) {
            return JSON.stringify(name);
        }
        return JSON.stringify(name) + "(alias: " + JSON.stringify(alias) + ")";
    }

    public getUsage(): string {
        const usage: string[] = [];
        if (this.usage) {
            return this.usage;
        }
        this.getArguments().forEach((argument: IArgument) => {
            if (argument.isRequired()) {
                usage.push("<" + argument.getName() + ">");
            } else if (!argument.isSpread()) {
                usage.push("[" + argument.getName() + "]");
            } else {
                usage.push("[" + argument.getName() + "...]");
            }
        })
        if (!this.getOptions().isEmpty()) {
            usage.push("[options...]");
        }
        return usage.join(" ");
    }

    public setDescription(description: string): void {
        this.description = String(description || "") || null;
    }

    public getDescription(): string {
        return this.description;
    }

    public getOptions(): IListDeclarationOptions {
        return this.options;
    }

    public getArguments(): IListDeclarationArguments {
        return this.arguments;
    }

    public setAction(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void {
        this.action = action || null;
    }

    public getAction(): (args: {[key: string]: any}, opts: {[key: string]: any}) => void {
        return this.action;
    }

}
