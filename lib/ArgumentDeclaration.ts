import {IArgument} from  "./IArgument.ts";
import {IArgumentDeclaration} from  "./IArgumentDeclaration.ts";

export class ArgumentDeclaration implements IArgumentDeclaration {

    private _name: string = null;

    private _required: boolean = false;

    private _spread: boolean = false;

    constructor(argument: string) {
        let prepared: string = String(argument || "");
        let matches: string[];
        if (matches = prepared.match(/^<([^\.]*)>$/i)) {
            this.setRequired(true);
            this.setName(matches[1]);
            this.setSpread(false)
        } else if (matches = prepared.match(/^\[([^\.]*)(\.\.\.)?\]$/i)) {
            this.setOptional(true);
            this.setName(matches[1]);
            this.setSpread(typeof matches[2] !== "undefined")
        } else {
            throw new Error("Invalid argument format");
        }
    }

    public setName(name: string): void {
        this._name = String(name || "") || null;
    }

    public getName(): string {
        return this._name;
    }

    public setRequired(required: boolean): void {
        this._required = !!required;
    }

    public isRequired(): boolean {
        return this._required;
    }

    public setOptional(optional: boolean): void {
        this._required = !optional;
    }

    public isOptional(): boolean {
        return !this._required;
    }

    public setSpread(spread: boolean): void {
        this._spread = !!spread;
    }

    public isSpread(): boolean {
        return this._spread;
    }

    public equal(argument: string|IArgument): boolean {
        if (typeof argument === "string") {
            return this.getName() === <string>argument;
        }
        return this.getName() === (<IArgument>argument).getName();
    }

}
