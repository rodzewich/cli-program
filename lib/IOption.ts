export interface IOption {
    getFlags(): string;
    getShort(): string;
    getLong(): string;
    getDescription(): string;
    isRequired(): boolean;
    isOptional(): boolean;
    isBool(): boolean;
    getType(): string;
    getDefaultValue(): any;
    getNegativePrefixes(): string[];
    getPreparationFunction(): (value: any) => any;
}
