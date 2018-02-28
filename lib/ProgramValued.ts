import {IProgramValued} from "./IProgramValued.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IArgumentValued} from "./IArgumentValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";

export class ProgramValued implements IProgramValued {

    private _declaration: IProgramDeclaration = null;

    private _options: IOptionValued[] = [];

    private _commands: ICommandValued[] = [];

    private _arguments: IArgumentValued[] = [];

    constructor(declaration: IProgramDeclaration, commands: ICommandValued[], opts: IOptionValued[], args: IArgumentValued[]) {
        this._declaration = declaration;
        this._commands    = commands;
        this._options     = opts;
        this._arguments   = args;
    }

    getName(): string {
        return this.getDeclaration().getName();
    }

    getDescription(): string {
        return this.getDeclaration().getDescription();
    }

    getVersion(): string {
        return this.getDeclaration().getVersion();
    }

    getVersionOption(): IOptionDeclaration {
        return this.getDeclaration().getVersionOption();
    }

    getUsage(): string {
        return this.getDeclaration().getUsage();
    }

    getOptions(): IOptionValued[] {
        return this._options;
    }

    getCommands(): ICommandValued[] {
        return this._commands;
    }

    getArguments(): IArgumentValued[] {
        return this._arguments;
    }

    getDeclaration(): IProgramDeclaration {
        return this._declaration;
    }

}
