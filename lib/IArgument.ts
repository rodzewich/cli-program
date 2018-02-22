export interface IArgument {
    getName(): string;
    isRequired(): boolean;
    isOptional(): boolean;
    isSpread(): boolean;
}
