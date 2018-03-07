import {IOption} from "./IOption.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import camelCase = require("lodash.camelcase");
import kebabCase = require("lodash.kebabcase");

export class OptionValued implements IOptionValued {

    private _declaration: IOptionDeclaration = null;

    private _original: string = null;

    private _value: any = null;

    constructor(options:{declaration: IOptionDeclaration, original: string}) {
        this._declaration = options.declaration || null;
        this._original = options.original || null;
    }

    public getFlags(): string {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getFlags();
    }

    public getShort(): string {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getShort();
    }

    public getLong(): string {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getLong();
    }

    public getName(): string {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getName();
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
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getDescription();
    }

    public isRequired(): boolean {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.isRequired();
    }

    public isOptional(): boolean {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.isOptional();
    }

    public isBool(): boolean {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.isBool();
    }

    public getType(): string {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getType();
    }

    public getDefaultValue(): any {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getDefaultValue();
    }

    public getNegativePrefixes(): string[] {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getNegativePrefixes();
    }

    public getPreparationFunction(): (value: string) => any {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.getPreparationFunction();
    }

    public equal(option: IOptionValued): boolean {
        const declaration: IOptionDeclaration = this.getDeclaration();
        if (!declaration) {
            throw new Error("Option declaration was removed.");
        }
        return declaration.equal(option);
    }

    public getOriginal(): string {
        return this._original;
    }

    public isNegative(): boolean {
        const original: string = this.getOriginal() || "";
        return (
            original &&
            original.substr(0, 2) === "--" &&
            (this.getNegativePrefixes() || [])
                .map((prefix: string) => kebabCase(prefix) + "-" + kebabCase(this.getLong()))
                .filter((long: string) => long === kebabCase(original.substr(2)))
                .length !== 0
        );
    }

    public getDeclaration(): IOptionDeclaration {
        return this._declaration;
    }

    public getValue(): any {
        return this._value;
    }

    public setValue(value: any): void {
        this._value = null;
        if (typeof value !== "undefined") {
            this._value = value;
        }
    }

}
