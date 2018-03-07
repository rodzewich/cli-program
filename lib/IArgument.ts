export interface IArgument {
    getName(): string;
    isRequired(): boolean;
    isOptional(): boolean;
    isSpread(): boolean;
    equal(argument: string|IArgument): boolean;
}
