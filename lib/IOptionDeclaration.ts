import {IOption} from "./IOption";

export interface IOptionDeclaration extends IOption {
    setFlags(flags: string): void;
    setShort(short: string): void;
    setLong(long: string): void;
    setDescription(description: string): void;
    setRequired(required: boolean): void;
    setOptional(optional: boolean): void;
    setType(type: string): void;
    setDefaultValue(defaultValue: string): void;
    setNegativePrefixes(negativePrefixes: string[]): void;
    setPreparationFunction(preparationFunction: (value: string) => any): void;
}
