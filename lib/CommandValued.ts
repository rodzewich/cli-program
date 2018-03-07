import {ICommandValued} from "./ICommandValued.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IListValuedOptions} from "./IListValuedOptions.ts";
import {ListValuedOptions} from "./ListValuedOptions.ts";
import {IListValuedArguments} from "./IListValuedArguments.ts";
import {ListValuedArguments} from "./ListValuedArguments.ts";

export class CommandValued implements ICommandValued {

    private options: IListValuedOptions = new ListValuedOptions();

    private arguments: IListValuedArguments = new ListValuedArguments();

    private declaration: ICommandDeclaration = null;

    constructor(declaration: ICommandDeclaration) {
        this.declaration = declaration;
    }

    public getName(): string {
        const declaration: ICommandDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Command declaration was removed.");
        }
        return declaration.getName();
    }

    public getAlias(): string {
        const declaration: ICommandDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Command declaration was removed.");
        }
        return declaration.getAlias();
    }

    public getFull(): string {
        const declaration: ICommandDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Command declaration was removed.");
        }
        return declaration.getFull();
    }

    public getUsage(): string {
        const declaration: ICommandDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Command declaration was removed.");
        }
        return declaration.getUsage();
    }

    public getDescription(): string {
        const declaration: ICommandDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Command declaration was removed.");
        }
        return declaration.getDescription();
    }

    public getOptions(): IListValuedOptions {
        return this.options;
    }

    public getArguments(): IListValuedArguments {
        return this.arguments;
    }

    public getDeclaration(): ICommandDeclaration {
        return this.declaration;
    }

}
