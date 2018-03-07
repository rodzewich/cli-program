import {IArgument} from "./IArgument.ts";
import {IArgumentValued} from "./IArgumentValued.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export class ArgumentValued implements IArgumentValued {

    private declaration: IArgumentDeclaration = null;

    private value: any = null;

    constructor(options: {declaration: IArgumentDeclaration, value: any}) {
        this.declaration = options.declaration;
        this.value = options.value;
    }

    public getName(): string {
        return this.getDeclaration().getName();
    }

    public isRequired(): boolean {
        return this.getDeclaration().isRequired();
    }

    public isOptional(): boolean {
        return this.getDeclaration().isOptional();
    }

    public isSpread(): boolean {
        return this.getDeclaration().isSpread();
    }

    public getDeclaration(): IArgumentDeclaration {
        return this.declaration;
    }

    public getValue(): void {
        return this.value;
    }

    public equal(argument: string|IArgument): boolean {
        if (typeof argument === "string") {
            return this.getName() === <string>argument;
        }
        return this.getName() === (<IArgument>argument).getName();
    }

}
