import {IArgumentValued} from "./IArgumentValued.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export class ArgumentValued implements IArgumentValued {

    private _declaration: IArgumentDeclaration = null;

    private _value: any = null;

    constructor(options: {declaration: IArgumentDeclaration, value: any}) {
        this._declaration = options.declaration;
        this._value = options.value;
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
        return this._declaration;
    }

    public getValue(): void {
        return this._value;
    }

}
