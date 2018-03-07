import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import kebabCase = require("lodash.kebabcase");

export class OptionDeclaration implements IOptionDeclaration {

    private flags: string = null;

    private short: string = null;

    private long: string = null;

    private description: string = null;

    private required: boolean = false;

    private type: string = null;

    private defaultValue: string = null;

    private negativePrefixes: string[] = [];

    private preparationFunction: (value: string) => any = null;

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
        this.flags = String(flags || "") || null;
    }

    public getFlags(): string {
        return this.flags;
    }

    public setShort(short: string): void {
        this.short = String(short || "") || null;
    }

    public getShort(): string {
        return this.short;
    }
    
    public getName(): string {
        const long: string = this.getLong(),
              short: string = this.getShort();
        if (!long) {
            return JSON.stringify("-" + short);
        }
        if (!short) {
            return JSON.stringify("--" + long);
        }
        return JSON.stringify("--" + long) + 
            "(" + JSON.stringify("-" + short) + ")";
    }

    public setLong(long: string): void {
        this.long = String(long || "") || null;
    }

    public getLong(): string {
        return this.long;
    }

    public setDescription(description: string): void {
        this.description = String(description || "") || null;
    }

    public getDescription(): string {
        return this.description;
    }

    public setRequired(required: boolean): void {
        this.required = !!required;
    }

    public isRequired(): boolean {
        return this.required;
    }

    public setOptional(optional: boolean): void {
        this.required = !optional;
    }

    public isOptional(): boolean {
        return !this.required;
    }

    public isBool(): boolean {
        return this.getType() === "boolean";
    }

    public setType(type: string): void {
        this.type = String(type || "") || "boolean";
    }

    public getType(): string {
        return this.type;
    }

    public setDefaultValue(defaultValue: string): void {
        this.defaultValue = defaultValue || null;
    }

    public getDefaultValue(): string {
        return this.defaultValue;
    }

    public setNegativePrefixes(negativePrefixes: string[]) {
        this.negativePrefixes = Array.isArray(negativePrefixes) ?
            negativePrefixes.reduce((accumulator: string[], value: any) => {
                const prepared: string = kebabCase(String(value));
                if (prepared && accumulator.indexOf(prepared) === -1) {
                    accumulator.push(prepared);
                }
                return accumulator;
            }, []) : [];
    }

    public getNegativePrefixes(): string[] {
        return this.negativePrefixes || [];
    }

    public setPreparationFunction(preparationFunction: (value: string) => any): void {
        this.preparationFunction = preparationFunction || null;
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
        return this.preparationFunction || defaultPreparationFunction;
    }

    public equal(option: IOptionDeclaration): boolean {
        return (
            this.getShort() !== null &&
            option.getShort() !== null &&
            this.getShort() === option.getShort() ||
            getAvailableNames(this)
                .some((long: string) => {
                    return getAvailableNames(option)
                            .indexOf(long) !== -1;
                }) ||
            getAvailableNames(option)
                .some((long: string) => {
                    return getAvailableNames(this)
                            .indexOf(long) !== -1;
                })
        );

        function getAvailableNames(option: IOptionDeclaration): string[] {
            if (option.getNegativePrefixes().length !== 0) {
                return [
                    kebabCase(option.getLong()),
                    ...option.getNegativePrefixes()
                        .map((prefix: string) => prefix + "-" + kebabCase(option.getLong()))
                ].filter(Boolean);
            } else {
                return [kebabCase(option.getLong())].filter(Boolean);
            }
        }
        
    }

}
