import {ICommandValued} from "./ICommandValued.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {IArgumentValued} from "./IArgumentValued.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";

export class CommandValued implements ICommandValued {

    private _options: IOptionValued[] = null;

    private _arguments: IArgumentValued[] = null;

    private _declaration: ICommandDeclaration = null;

    constructor(options:{declaration: ICommandDeclaration, opts?: IOptionValued[], args?: IArgumentValued[]}) {
        this._declaration = options.declaration;
        this._options = options.opts || [];
        this._arguments = options.args || [];
    }

    getName(): string {
        return this.getDeclaration().getName();
    }

    getAlias(): string {
        return this.getDeclaration().getAlias();
    }

    getUsage(): string {
        return this.getDeclaration().getUsage();
    }

    getDescription(): string {
        return this.getDeclaration().getDescription();
    }

    getOptions(): IOptionValued[] {
        return this._options;
    }

    getArguments(): IArgumentValued[] {
        return this._arguments;
    }

    getDeclaration(): ICommandDeclaration {
        return this._declaration;
    }

}
