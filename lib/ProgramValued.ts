import {IProgramValued} from "./IProgramValued.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {IListValuedOptions} from "./IListValuedOptions.ts";
import {ListValuedOptions} from "./ListValuedOptions.ts";
import {IListValuedArguments} from './IListValuedArguments.ts';
import {ListValuedArguments} from './ListValuedArguments.ts';

export class ProgramValued implements IProgramValued {

    private declaration: IProgramDeclaration = null;

    private options: IListValuedOptions = new ListValuedOptions();

    private command: ICommandValued = null;

    private arguments: IListValuedArguments = new ListValuedArguments();

    constructor(declaration: IProgramDeclaration) {
        this.declaration = declaration;
    }

    public getName(): string {
        const declaration: IProgramDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Program declaration was removed.");
        }
        return declaration.getName();
    }

    public getDescription(): string {
        const declaration: IProgramDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Program declaration was removed.");
        }
        return declaration.getDescription();
    }

    public getVersion(): string {
        const declaration: IProgramDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Program declaration was removed.");
        }
        return declaration.getVersion();
    }

    public getVersionOption(): IOptionDeclaration {
        const declaration: IProgramDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Program declaration was removed.");
        }
        return declaration.getVersionOption();
    }

    public getUsage(): string {
        const declaration: IProgramDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Program declaration was removed.");
        }
        return declaration.getUsage();
    }

    public getOptions(): IListValuedOptions {
        return this.options;
    }

    public getCommand(): ICommandValued {
        return this.command;
    }

    public setCommand(command: ICommandValued): void {
        this.command = command || null;
    }

    public getArguments(): IListValuedArguments {
        return this.arguments;
    }

    public getDeclaration(): IProgramDeclaration {
        return this.declaration;
    }

}
