import {IOption} from "./IOption.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import kebabCase = require("lodash.kebabcase");

export class OptionDeclaration implements IOptionDeclaration {

    private _flags: string = null;

    private _short: string = null;

    private _long: string = null;

    private _description: string = null;

    private _required: boolean = false;

    private _type: string = null;

    private _defaultValue: string = null;

    private _negativePrefixes: string[] = [];

    private _preparationFunction: (value: string) => any = null;

    constructor(options:{flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any}) {
        // todo: Error when define negative prefixes without long
        let flags: string = String(options.flags || ""),
            description: string = options.description,
            defaultValue: any = options.defaultValue,
            negativePrefixes: string[] = options.negativePrefixes,
            preparationFunction: (value: any) => any = options.preparationFunction,
            matches: string[];
        if (matches = flags.match(/^\s*-([a-z])(?:\s<([a-z]\w*)>)?\s*$/i)) {
            this.setFlags(flags);
            this.setRequired(true);
            this.setShort(matches[1]);
            this.setLong(null);
            this.setType(matches[2]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else if (matches = flags.match(/^\s*-([a-z])(?:\s\[([a-z]\w*)\])?\s*$/i)) {
            this.setFlags(flags);
            this.setOptional(true);
            this.setShort(matches[1]);
            this.setLong(null);
            this.setType(matches[2]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else if (matches = flags.match(/^\s*--([a-z][\w-]*)(?:\s<([a-z]\w*)>)?\s*$/i)) {
            this.setFlags(flags);
            this.setRequired(true);
            this.setShort(null);
            this.setLong(matches[1]);
            this.setType(matches[2]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else if (matches = flags.match(/^\s*--([a-z][\w-]*)(?:\s\[([a-z]\w*)\])?\s*$/i)) {
            this.setFlags(flags);
            this.setOptional(true);
            this.setShort(null);
            this.setLong(matches[1]);
            this.setType(matches[2]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else if (matches = flags.match(/^\s*-([a-z]),\s*(?:--([a-z][\w-]*))(?:\s<([a-z]\w*)>)?\s*$/i)) {
            this.setFlags(flags);
            this.setRequired(true);
            this.setShort(matches[1]);
            this.setLong(matches[2]);
            this.setType(matches[3]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else if (matches = flags.match(/^\s*-([a-z]),\s*(?:--([a-z][\w-]*))(?:\s\[([a-z]\w*)\])?\s*$/i)) {
            this.setFlags(flags);
            this.setOptional(true);
            this.setShort(matches[1]);
            this.setLong(matches[2]);
            this.setType(matches[3]);
            this.setDescription(description);
            this.setDefaultValue(defaultValue);
            this.setNegativePrefixes(negativePrefixes);
            this.setPreparationFunction(preparationFunction);
        } else {
            throw new Error("Invalid flags format.");
        }
    }

    public setFlags(flags: string): void {
        this._flags = String(flags || "") || null;
    }

    public getFlags(): string {
        return this._flags;
    }

    public setShort(short: string): void {
        this._short = String(short || "") || null;
    }

    public getShort(): string {
        return this._short;
    }

    public setLong(long: string): void {
        this._long = String(long || "") || null;
    }

    public getLong(): string {
        return this._long;
    }

    public setDescription(description: string): void {
        this._description = String(description || "") || null;
    }

    public getDescription(): string {
        return this._description;
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

    public isBool(): boolean {
        return this.getType() === "boolean";
    }

    public setType(type: string): void {
        this._type = String(type || "") || "boolean";
    }

    public getType(): string {
        return this._type;
    }

    public setDefaultValue(defaultValue: string): void {
        this._defaultValue = defaultValue || null;
    }

    public getDefaultValue(): string {
        return this._defaultValue;
    }

    public setNegativePrefixes(negativePrefixes: string[]) {
        this._negativePrefixes = Array.isArray(negativePrefixes) ?
            negativePrefixes.reduce((accumulator: string[], value: any) => {
                const prepared: string = kebabCase(String(value));
                if (prepared && accumulator.indexOf(prepared) === -1) {
                    accumulator.push(prepared);
                }
                return accumulator;
            }, []) : [];
    }

    public getNegativePrefixes(): string[] {
        return this._negativePrefixes || [];
    }

    public setPreparationFunction(preparationFunction: (value: string) => any): void {
        this._preparationFunction = preparationFunction || null;
    }

    public getPreparationFunction(): (value: string) => any {
        const type: string = this.getType();
        function defaultPreparationFunction(value: string): any {
            const temp: string = String(value || "");
            switch (type) {
                case "boolean":
                    return ["", "0", "no", "off", "false"]
                            .indexOf(temp.replace(/^\s*(\S+(?:.*?\S))\s*$/, "$1").toLowerCase()) === -1;
                case "number":
                    if (/^\s*0[0-7]+\s*$/.test(temp)) {
                        return parseInt(temp, 8);
                    }
                    if (/^\s*0x[0-9a-f]+\s*$/i.test(temp)) {
                        return parseInt(temp.substr(temp.indexOf("x") + 1), 16);
                    }
                    return parseFloat(temp) || 0;
                case "string":
                    return temp;
                default:
                    return value;
            }
        }
        return this._preparationFunction || defaultPreparationFunction;
    }

    public equal(option: string|IOption): boolean {
        if (option) {
            if (typeof option === "string") {
                return [
                        kebabCase(this.getShort()),
                        kebabCase(this.getLong()),
                        ...this.getNegativePrefixes()
                            .map((prefix: string) => prefix + "-" + kebabCase(this.getLong()))
                            .filter(Boolean)
                    ].indexOf(kebabCase(option as string)) !== -1;
            } else {
                return (
                    this.getShort() === option.getShort() ||
                    [
                        kebabCase(option.getLong()),
                        ...option.getNegativePrefixes()
                            .map((prefix: string) => prefix + "-" + kebabCase(option.getLong()))

                    ]
                        .filter(Boolean)
                        .some((long: string) => {
                            return [
                                    kebabCase(this.getLong()),
                                    ...this.getNegativePrefixes()
                                        .map((prefix: string) => prefix + "-" + kebabCase(this.getLong()))

                                ]
                                    .filter(Boolean)
                                    .indexOf(long) !== -1;
                        }) ||
                    [
                        kebabCase(this.getLong()),
                        ...this.getNegativePrefixes()
                            .map((prefix: string) => prefix + "-" + kebabCase(this.getLong()))

                    ]
                        .filter(Boolean)
                        .some((long: string) => {
                            return [
                                    kebabCase(option.getLong()),
                                    ...option.getNegativePrefixes()
                                        .map((prefix: string) => prefix + "-" + kebabCase(option.getLong()))

                                ]
                                    .filter(Boolean)
                                    .indexOf(long) !== -1;
                        })
                );
            }
        }
        return false;
    }

}
