import {IOptionValued} from "./IOptionValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import camelCase = require("lodash.camelcase");

export class OptionValued implements IOptionValued {

    private _declaration: IOptionDeclaration = null;

    private _value: any = null;

    constructor(options:{declaration: IOptionDeclaration, value: any}) {
        this._declaration = options.declaration;
        this._value = options.value;
    }

    public getFlags(): string {
        return this.getDeclaration().getFlags();
    }

    public getShort(): string {
        return this.getDeclaration().getShort();
    }

    public getLong(): string {
        return this.getDeclaration().getLong();
    }

    public getAttribute(): string {
        const short: string = this.getShort(),
              long: string  = this.getLong();
        if (long !== null) {
            return camelCase(this.getLong());
        }
        return short;
    }

    public getDescription(): string {
        return this.getDeclaration().getDescription();
    }

    public isRequired(): boolean {
        return this.getDeclaration().isRequired();
    }

    public isOptional(): boolean {
        return this.getDeclaration().isOptional();
    }

    public isBool(): boolean {
        return this.getDeclaration().isBool();
    }

    public getType(): string {
        return this._declaration.getType();
    }

    public getDefaultValue(): any {
        return this.getDeclaration().getDefaultValue();
    }

    public getNegativePrefixes(): string[] {
        return this.getDeclaration().getNegativePrefixes();
    }

    public getPreparationFunction(): (value: any) => any {
        return this.getDeclaration().getPreparationFunction();
    }

    public getDeclaration(): IOptionDeclaration {
        return this._declaration;
    }

    public getValue(): any {
        return this._value;
    }

}
