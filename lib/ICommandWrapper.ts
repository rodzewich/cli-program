export interface ICommandWrapper {
    alias(alias: string): ICommandWrapper;
    usage(usage: string): ICommandWrapper;
    option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): ICommandWrapper;
    description(description: string): ICommandWrapper;
    action(action: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): ICommandWrapper;
}
