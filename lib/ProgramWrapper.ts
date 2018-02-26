import {IProgramWrapper} from "./IProgramWrapper.ts";
import {ICommandWrapper} from "./ICommandWrapper.ts";
import {CommandWrapper} from "./CommandWrapper.ts";
import {OptionDeclaration} from "./OptionDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {CommandDeclaration} from "./CommandDeclaration.ts";
import {IArgumentValued} from "./IArgumentValued.ts";
import {IOptionValued} from "./IOptionValued.ts";
import {OptionValued} from "./OptionValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";
import {ArgumentValued} from "./ArgumentValued.ts";
import {ProgramValued} from "./ProgramValued.ts";
import {CommandValued} from "./CommandValued.ts";
import {declaration as program} from "./declaration.ts";
import {showError, getCountOfRequireArguments, findArgumentByIndex, findCommandByName, findCommandByAlias, findOptionByShort, findOptionByLong, showHelp} from "./utils.ts";

export class ProgramWrapper implements IProgramWrapper {

    public name(name: string): IProgramWrapper {
        try {
            program.setName(name);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public version(version: string, flags?: string, description?: string): IProgramWrapper {
        try {
            program.setVersion(version);
            program.addOption(new OptionDeclaration({
                flags : flags || "-V, --version",
                description : description || "Show version"
            }));
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public description(description: string): IProgramWrapper {
        try {
            program.setDescription(description);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public usage(usage: string): IProgramWrapper {
        try {
            program.setUsage(usage);
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): IProgramWrapper {
        try {
            program.addOption(new OptionDeclaration({flags, description, defaultValue, negativePrefixes, preparationFunction}));
            return this;
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public command(command: string): ICommandWrapper {
        try {
            const instance: ICommandDeclaration = new CommandDeclaration(command);
            program.addCommand(instance);
            return new CommandWrapper(instance);
        } catch (error) {
            showError(error);
            process.exit(1);
        }
    }

    public parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void): void {
        let command: ICommandDeclaration;
        const data: string[] = process.argv.slice(2),
            programArgs: IArgumentValued[] = [],
            programOpts: IOptionValued[]   = [],
            commandArgs: IArgumentValued[] = [],
            commandOpts: IOptionValued[]   = [];
        try {
            while (data.length !== 0) {
                const item: string = data.shift();
                if (/^--[a-z][a-z0-9-]*$/i.test(item)) {
                    const long: string = item.substr(2),
                          declaration: IOptionDeclaration = findOptionByLong<IOptionDeclaration>(long, (command || program).getOptions()),
                          preparationFunction: (value: any) => any = declaration ? declaration.getPreparationFunction() || null : null;
                    if (declaration === null) {
                        let suffix: string = "";
                        if (command) {
                            suffix = " in " + JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                suffix += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            suffix += " command";
                        }
                        throw new Error("You cannot use undeclared " + JSON.stringify(long) + " option" + suffix + ".");
                    }
                    if (!declaration.isBool() && data.length === 0 ||
                        !declaration.isBool() && data[0].substr(0, 1) === "-") {
                        throw new Error("Option " + JSON.stringify(declaration.getLong()) + " should be defined.");
                    }
                    if (command) {
                        const value: any = declaration.isBool() ? true : data.shift();
                        commandOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    } else {
                        const value: any = declaration.isBool() ? true : data.shift();
                        programOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    }
                } else if (/^--[a-z][a-z0-9-]*=/i.test(item)) {
                    const long: string  = item.substr(2, item.indexOf('=') - 2),
                          value: string = item.substr(item.indexOf('=') + 1),
                          declaration: IOptionDeclaration = findOptionByLong<IOptionDeclaration>(long, (command || program).getOptions()),
                          preparationFunction: (value: any) => any = declaration ? declaration.getPreparationFunction() || null : null;
                    if (declaration === null) {
                        let suffix: string = "";
                        if (command) {
                            suffix = " in " + JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                suffix += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            suffix += " command";
                        }
                        throw new Error("You cannot use undeclared " + JSON.stringify(long) + " option" + suffix + ".");
                    }
                    if (command) {
                        commandOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    } else {
                        programOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    }
                } else if (/^-[a-z]$/i.test(item)) {
                    const short: string = item.substr(1),
                          declaration: IOptionDeclaration = findOptionByShort<IOptionDeclaration>(short, (command || program).getOptions()),
                          preparationFunction: (value: any) => any = declaration ? declaration.getPreparationFunction() || null : null;
                    if (declaration === null) {
                        let suffix: string = "";
                        if (command) {
                            suffix = " in " + JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                suffix += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            suffix += " command";
                        }
                        throw new Error("You cannot use undeclared " + JSON.stringify(short) + " option" + suffix + ".");
                    }
                    if (!declaration.isBool() && data.length === 0 ||
                        !declaration.isBool() && data[0].substr(0, 1) === "-") {
                        throw new Error("Option " + JSON.stringify(declaration.getShort()) + " should be defined.");
                    }
                    if (command) {
                        const value: any = declaration.isBool() ? true : data.shift();
                        commandOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    } else {
                        const value: any = declaration.isBool() ? true : data.shift();
                        programOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    }
                } else if (/^-[a-z]=/i.test(item)) {
                    const short: string = item.substr(1, 1),
                          value: string = item.substr(3),
                          declaration: IOptionDeclaration = findOptionByShort<IOptionDeclaration>(short, (command || program).getOptions()),
                          preparationFunction: (value: any) => any = declaration ? declaration.getPreparationFunction() || null : null;
                    if (declaration === null) {
                        let suffix: string = "";
                        if (command) {
                            suffix = " in " + JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                suffix += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            suffix += " command";
                        }
                        throw new Error("You cannot use undeclared " + JSON.stringify(short) + " option" + suffix + ".");
                    }
                    if (!declaration.isBool() && data.length === 0 ||
                        !declaration.isBool() && data[0].substr(0, 1) === "-") {
                        throw new Error("Option " + JSON.stringify(declaration.getShort()) + " should be defined.");
                    }
                    if (command) {
                        commandOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    } else {
                        programOpts.push(new OptionValued({
                            declaration,
                            value : preparationFunction ? preparationFunction(value) : value
                        }));
                    }
                } else if (!command && program.getCommands().length !== 0) {
                    command = findCommandByName<ICommandDeclaration>(item, program.getCommands()) ||
                        findCommandByAlias<ICommandDeclaration>(item, program.getCommands());

                    if (!command && !findOptionByLong<IOptionValued>("help", programOpts)) {
                        throw new Error("You cannot use undeclared " + JSON.stringify(item) + " command.");
                    }
                } else if (command) {
                    const arg: IArgumentDeclaration = findArgumentByIndex(commandArgs.length, command.getArguments());
                    if (arg === null) {
                        if (!findOptionByLong<IOptionValued>("help", commandOpts)) {
                            let commandName: string = JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                commandName += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            throw new Error("You cannot use undeclared " + JSON.stringify(item) + " argument " + commandName + " command.");
                        }
                    } else {
                        commandArgs.push(new ArgumentValued({declaration: arg, value: item}));
                    }
                } else {
                    const arg: IArgumentDeclaration = findArgumentByIndex(programArgs.length, program.getArguments());
                    if (arg === null) {
                        if (!findOptionByLong<IOptionValued>("help", programOpts)) {
                            throw new Error("You cannot use undeclared " + JSON.stringify(item) + " argument.");
                        }
                    } else {
                        programArgs.push(new ArgumentValued({declaration: arg, value: item}));
                    }
                }
            }

            const countOfProgramRequireArguments: number = getCountOfRequireArguments(program.getArguments());
            const countOfCommandRequireArguments: number = command ? getCountOfRequireArguments(command.getArguments()) : null;

            if (program.getArguments().length !== 0 &&
                programArgs.length < countOfProgramRequireArguments &&
                !findOptionByLong<IOptionValued>("help", programOpts)) {
                throw new Error("Invalid number of arguments. Program require " + JSON.stringify(countOfProgramRequireArguments) + " argument(s).");
            }

            if (command &&
                command.getArguments().length !== 0 &&
                commandArgs.length < countOfCommandRequireArguments &&
                !findOptionByLong<IOptionValued>("help", programOpts) &&
                !findOptionByLong<IOptionValued>("help", commandOpts)) {
                let commandName: string = JSON.stringify(command.getName());
                if (command.getAlias()) {
                    commandName += "(" + JSON.stringify(command.getAlias()) + ")";
                }
                throw new Error("Invalid number of arguments. Command " + commandName + " require " + JSON.stringify(countOfCommandRequireArguments) + " argument(s).");
            }

            for (const declaration of program.getOptions()) {
                if (["help", "version"].indexOf(declaration.getLong()) === -1 &&
                    !findOptionByLong<IOptionValued>("help", commandOpts) &&
                    !findOptionByLong<IOptionValued>(declaration.getLong(), programOpts)) {
                    if (!declaration.isBool() &&
                        declaration.isRequired() &&
                        !findOptionByLong<IOptionValued>("help", programOpts)) {
                        let optionName: string = JSON.stringify("--" + declaration.getLong());
                        if (declaration.getShort()) {
                            optionName += "(" + JSON.stringify("-" + declaration.getShort()) + ")";
                        }
                        throw new Error("You should specify required option " + optionName + ".");
                    }
                    programOpts.push(new OptionValued({
                        declaration,
                        value: declaration.getDefaultValue()
                    }));
                }
            }

            if (command) {
                for (const declaration of command.getOptions()) {
                    if (declaration.getLong() !== "help" &&
                        !findOptionByLong<IOptionValued>(declaration.getLong(), commandOpts)) {
                        if (!declaration.isBool() &&
                            declaration.isRequired() &&
                            !findOptionByLong<IOptionValued>("help", commandOpts)) {
                            let optionName: string = JSON.stringify("--" + declaration.getLong());
                            if (declaration.getShort()) {
                                optionName += "(" + JSON.stringify("-" + declaration.getShort()) + ")";
                            }
                            let commandName: string = JSON.stringify(command.getName());
                            if (command.getAlias()) {
                                commandName += "(" + JSON.stringify(command.getAlias()) + ")";
                            }
                            throw new Error("You should specify required option " + optionName + " in command " + commandName + ".");
                        }
                        commandOpts.push(new OptionValued({
                            declaration,
                            value: declaration.getDefaultValue()
                        }));
                    }
                }
            }

            if (findOptionByLong<IOptionValued>("help", programOpts)) {
                process.stdout.write(showHelp(new ProgramValued(program, [], programOpts, programArgs)));
                process.stdout.write("\n");
                process.exit(0);
            }

            if (findOptionByLong<IOptionValued>("version", programOpts)) {
                process.stdout.write("Version: " + program.getVersion() || "undefined");
                process.stdout.write("\n");
                process.exit(0);
            }

            if (!command && program.getCommands().length !== 0) {
                throw new Error("You should specify command.");
            }

            if (!command) {
                if (!action) {
                    throw Error("You cannot continue without default handler.");
                }
                setTimeout(() => {
                    action(
                        programArgs.reduce((accumulator:{[key: string]: any}, argument: IArgumentValued) => {
                            const name: string = argument.getName(),
                                  value: any   = argument.getValue();
                            if (argument.isSpread()) {
                                if (!Array.isArray(accumulator[name])) {
                                    accumulator[name] = [];
                                }
                                accumulator[name].push(value);
                            } else {
                                accumulator[name] = value;
                            }
                            return accumulator;
                        }, {}),
                        programOpts.reduce((accumulator:{[key: string]: any}, option: IOptionValued) => {
                            if (["help", "version", "color"].indexOf(option.getLong()) === -1) {
                                accumulator[option.getAttribute()] = option.getValue();
                            }
                            return accumulator;
                        }, {})
                    );
                }, 0);
            } else {
                const commandAction: (args: {[key: string]: void}, opts: {[key: string]: void}) => void = command.getAction();
                if (findOptionByLong<IOptionValued>("help", commandOpts)) {
                    process.stdout.write(showHelp(new ProgramValued(program, [new CommandValued({declaration: command, opts: commandOpts, args: commandArgs})], programOpts, programArgs)));
                    process.stdout.write("\n");
                    process.exit(0);
                } else if (!commandAction) {
                    let commandName: string = JSON.stringify(command.getName());
                    if (command.getAlias()) {
                        commandName += "(" + JSON.stringify(command.getAlias()) + ")";
                    }
                    throw Error("You cannot continue without handler for " + commandName + " command.");
                } else {
                    setTimeout(() => {
                        commandAction(
                            {
                                ...programArgs.reduce((accumulator:{[key: string]: any}, argument: IArgumentValued) => {
                                    const name: string = argument.getName(),
                                          value: any   = argument.getValue();
                                    if (argument.isSpread()) {
                                        if (!Array.isArray(accumulator[name])) {
                                            accumulator[name] = [];
                                        }
                                        accumulator[name].push(value);
                                    } else {
                                        accumulator[name] = value;
                                    }
                                    return accumulator;
                                }, {}),
                                ...commandArgs.reduce((accumulator:{[key: string]: any}, argument: IArgumentValued) => {
                                    const name: string = argument.getName(),
                                          value: any   = argument.getValue();
                                    if (argument.isSpread()) {
                                        if (!Array.isArray(accumulator[name])) {
                                            accumulator[name] = [];
                                        }
                                        accumulator[name].push(value);
                                    } else {
                                        accumulator[name] = value;
                                    }
                                    return accumulator;
                                }, {})
                            },
                            {
                                ...programOpts.reduce((accumulator:{[key: string]: any}, option: IOptionValued) => {
                                    if (["help", "version", "color"].indexOf(option.getLong()) === -1) {
                                        accumulator[option.getAttribute()] = option.getValue();
                                    }
                                    return accumulator;
                                }, {}),
                                ...commandOpts.reduce((accumulator:{[key: string]: any}, option: IOptionValued) => {
                                    if (["help"].indexOf(option.getLong()) === -1) {
                                        accumulator[option.getAttribute()] = option.getValue();
                                    }
                                    return accumulator;
                                }, {})
                            }
                        );
                    }, 0);
                }
            }
        } catch (error) {
            showError(error, showHelp(new ProgramValued(program, [], programOpts, programArgs)));
            process.exit(1);
        }
    }

}
