export interface IOption {
    getFlags(): string;
    getShort(): string;
    getName(): string;
    getLong(): string;
    getDescription(): string;
    isRequired(): boolean;
    isOptional(): boolean;
    isBool(): boolean;
    getType(): string;
    getDefaultValue(): string;
    getNegativePrefixes(): string[];
    getPreparationFunction(): (value: string) => any;
    equal(option: IOption): boolean;
}
