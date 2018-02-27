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
import {ArgumentDeclaration} from "./ArgumentDeclaration.ts";
import {ArgumentValued} from "./ArgumentValued.ts";
import {ProgramValued} from "./ProgramValued.ts";
import {CommandValued} from "./CommandValued.ts";
import {ProgramDeclaration} from "./ProgramDeclaration.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {setProgramDeclaration, getProgramDeclaration, addCommandToProgram, showError,
    getCountOfRequireArguments, findArgumentByIndex, findCommandByName,
    findCommandByAlias, findOptionByShort, findOptionByLong, showHelp} from "./utils.ts";

/**
 * User friendly program interface.
 */
export class ProgramWrapper implements IProgramWrapper {

    /**
     * Class constructor.
     */
    constructor() {
        setProgramDeclaration(this, new ProgramDeclaration());
    }

    public toString(): string {
        const declaration: IProgramDeclaration = getProgramDeclaration(this);
        return "[ProgramWrapper<name: "+ JSON.stringify(declaration.getName()) +", version: " + JSON.stringify(declaration.getVersion()) + ">]";
    }

    /**
     * Declare program name.
     * @param name Program name.
     * @returns {ProgramWrapper}
     */
    public name(name: string, exit?: (code?: number) => void): IProgramWrapper {
        try {
            getProgramDeclaration(this).setName(name);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program version.
     * @param version Program version.
     * @param flags Flags format.
     * @param description Flags description.
     * @returns {ProgramWrapper}
     */
    public version(version: string, flags?: string, description?: string, exit?: (code?: number) => void): IProgramWrapper {
        try {
            getProgramDeclaration(this).setVersion(version);
            getProgramDeclaration(this).addOption(new OptionDeclaration({
                flags : flags || "-V, --version",
                description : description || "Show version."
            }));
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program description.
     * @param description Program description.
     * @returns {ProgramWrapper}
     */
    public description(description: string, exit?: (code?: number) => void): IProgramWrapper {
        try {
            getProgramDeclaration(this).setDescription(description);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program usage format.
     * @param usage Usage format.
     * @returns {ProgramWrapper}
     */
    public usage(usage: string, exit?: (code?: number) => void): IProgramWrapper {
        try {
            getProgramDeclaration(this).setUsage(usage);
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program option.
     * @param flags Option flags.
     * @param description Option description.
     * @param defaultValue Option default value. Works only for optional options.
     * @param negativePrefixes List of negative prefixes for option.
     * @param preparationFunction Function for preparation option value.
     * @returns {ProgramWrapper}
     */
    public option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any, exit?: (code?: number) => void): IProgramWrapper {
        try {
            getProgramDeclaration(this).addOption(new OptionDeclaration({flags, description, defaultValue, negativePrefixes, preparationFunction}));
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program command.
     * @param command Command name.
     * @returns {ICommandWrapper}
     */
    public command(command: string, exit?: (code?: number) => void): ICommandWrapper {
        try {
            const program: IProgramDeclaration  = getProgramDeclaration(this),
                  instance: ICommandDeclaration = new CommandDeclaration(command),
                  wrapper: ICommandWrapper      = new CommandWrapper(instance);
            program.addCommand(instance);
            addCommandToProgram(this, wrapper);
            return wrapper;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Declare program arguments.
     * @param args Program arguments.
     * @returns {ProgramWrapper}
     */
    public arguments(args: string, exit?: (code?: number) => void): IProgramWrapper {
        try {
            let matches: string[] = String(args || "")
                .match(/^(<(?:[a-z][a-z0-9-]*)>|\[(?:[a-z][a-z0-9-]*)(?:\.\.\.)?\])((?:\s<(?:[a-z][a-z0-9-]*)>|\s\[(?:[a-z][a-z0-9-]*)(?:\.\.\.)?\])*)$/i);
            if (matches === null) {
                throw new Error("Invalid arguments format");
            }
            getProgramDeclaration(this).addArgument(new ArgumentDeclaration(matches[1]));
            if (matches[2]) {
                const other: string[] = matches[2].split(/\s+/);
                for (const argument of other) {
                    getProgramDeclaration(this).addArgument(new ArgumentDeclaration(argument));
                }
            }
            return this;
        } catch (error) {
            showError(error);
            (exit || process.exit)(1);
        }
    }

    /**
     * Start parsing process.
     * @param action Program default handler. Not needed if any command was declared.
     */
    public parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void, argv?: string[], stdout?: (content: string) => void, stderr?: (content: string) => void, exit?: (code?: number) => void): void {
        let command: ICommandDeclaration;
        const data: string[] = (argv || process.argv).slice(2),
              name: string = (argv || process.argv)[1],
              program: IProgramDeclaration = getProgramDeclaration(this),
              programArgs: IArgumentValued[] = [],
              programOpts: IOptionValued[]   = [],
              commandArgs: IArgumentValued[] = [],
              commandOpts: IOptionValued[]   = [];

        function showStdout(content: string): void {
            if (typeof stdout === "function") {
                stdout(content);
            } else {
                process.stdout.write(content);
            }
        }
        
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

            const programOptions: IOptionDeclaration[] = program.getOptions();
            for (const declaration of programOptions) {
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
                const commandOptions: IOptionDeclaration[] = command.getOptions();
                for (const declaration of commandOptions) {
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
                showStdout(showHelp(new ProgramValued(program, [], programOpts, programArgs), name));
                showStdout("\n");
                if (typeof exit === "function") {
                    return exit(0);
                } else {
                    process.exit(0);
                }
            }

            if (findOptionByLong<IOptionValued>("version", programOpts)) {
                showStdout("Version: " + program.getVersion() || "undefined");
                showStdout("\n");
                if (typeof exit === "function") {
                    return exit(0);
                } else {
                    process.exit(0);
                }
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
                    showStdout(showHelp(new ProgramValued(program, [new CommandValued({declaration: command, opts: commandOpts, args: commandArgs})], programOpts, programArgs), name));
                    showStdout("\n");
                    if (typeof exit === "function") {
                        return exit(0);
                    } else {
                        process.exit(0);
                    }
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
            showError(error, showHelp(new ProgramValued(program, [], programOpts, programArgs), name), stdout, stderr);
            if (typeof exit === "function") {
                return exit(1);
            } else {
                process.exit(1);
            }
        }
    }

}
