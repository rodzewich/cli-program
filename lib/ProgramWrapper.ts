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
import camelCase = require("lodash.camelcase");
import snakeCase = require("lodash.snakecase");
import kebabCase = require("lodash.kebabcase");
import {setProgramDeclaration, getProgramDeclaration, addCommandToProgram,
    getStdoutHandlerForProgram, getStderrHandlerForProgram,
    getExitHandlerForProgram, showError, showHelp} from "./utils.ts";
import {IProgramValued} from './IProgramValued';
import {ICommandValued} from './ICommandValued';
import {IListValuedArguments} from './IListValuedArguments';

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
    public name(name: string): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration.setName(name);
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Declare program version.
     * @param version Program version.
     * @param flags Flags format.
     * @param description Flags description.
     * @returns {ProgramWrapper}
     */
    public version(version: string, flags?: string, description?: string): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration.setVersion(version, flags, description);
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Declare program description.
     * @param description Program description.
     * @returns {ProgramWrapper}
     */
    public description(description: string): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration.setDescription(description);
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Declare program usage format.
     * @param usage Usage format.
     * @returns {ProgramWrapper}
     */
    public usage(usage: string): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration.setUsage(usage);
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
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
    public option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration
                .getOptions()
                .addOption(new OptionDeclaration({
                    flags,
                    description,
                    defaultValue,
                    negativePrefixes,
                    preparationFunction
                }));
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Declare program command.
     * @param command Command name.
     * @returns {ICommandWrapper}
     */
    public command(command: string): ICommandWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this),
                  instance: ICommandDeclaration = new CommandDeclaration(command),
                  wrapper: ICommandWrapper      = new CommandWrapper(instance);
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            if (!declaration.getArguments().isEmpty()) {
                throw new Error("You cannot declare commands with arguments.");
            }
            declaration.getCommands().addCommand(instance);
            addCommandToProgram(this, wrapper);
            return wrapper;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Declare program arguments.
     * @param args Program arguments.
     * @returns {ProgramWrapper}
     */
    public arguments(args: string): IProgramWrapper {
        try {
            const declaration: IProgramDeclaration = getProgramDeclaration(this),
                  matches: string[] = String(args || "")
                      .match(/^\s*(<(?:[a-z][\w-]*)>|\[(?:[a-z][\w-]*)(?:\.\.\.)?\])((?:\s+<(?:[a-z][\w-]*)>|\s\[(?:[a-z][\w-]*)(?:\.\.\.)?\])*)\s*$/i);
            if (matches === null) {
                throw new Error("Invalid arguments format.");
            }
            if (!declaration) {
                throw new Error("Program declaration was removed.");
            }
            declaration
                .getArguments()
                .addArgument(new ArgumentDeclaration(matches[1]));
            if (matches[2]) {
                const otherArguments: string[] = matches[2].split(/\s+/);
                for (const argument of otherArguments) {
                    if (argument !== "") {
                        declaration
                            .getArguments()
                            .addArgument(new ArgumentDeclaration(argument));
                    }
                }
            }
            return this;
        } catch (error) {
            showError(error, null, getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            getExitHandlerForProgram(this)(1);
        }
    }

    /**
     * Start parsing process.
     * @param action Program default handler. Not needed if any command was declared.
     * @param argv Command line arguments.
     */
    public parse(action?: (args: {[key: string]: any}, opts: {[key: string]: any}) => void, argv?: string[]): void {
        let data: string[] = (argv || process.argv).slice(2),
            name: string   = (argv || process.argv)[1],
            parsedError: Error                   = null,
            declaredProgram: IProgramDeclaration = getProgramDeclaration(this),
            parsedProgram: IProgramValued        = new ProgramValued(declaredProgram),
            stdout: (text: string) => void       = getStdoutHandlerForProgram(this);

        try {
            while (data.length !== 0) {

                const item: string = data.shift(),
                      parsedCommand: ICommandValued = parsedProgram.getCommand(),
                      declaredCommand: ICommandDeclaration = parsedProgram.getCommand() ?
                          parsedProgram.getCommand().getDeclaration() : null;

                if (/^--[a-z][\w-]*$/i.test(item)) {

                    const longName: string = item.substr(2),
                          declaredOption: IOptionDeclaration = (declaredCommand || declaredProgram).getOptions().findByLong(longName),
                          preparationFunction: (value: any) => any = declaredOption ? declaredOption.getPreparationFunction() || null : null;

                    if (declaredOption === null) {
                        if (parsedError === null) {
                            parsedError = new Error("You cannot use undeclared " + JSON.stringify("--" + longName) +
                                " option" + (declaredCommand ? " in " + declaredCommand.getFull() + " command." : "."));
                        }
                        continue;
                    }

                    const parsedOption: IOptionValued = new OptionValued({
                        declaration: declaredOption,
                        original : "--" + longName
                    });

                    if (!parsedOption.isNegative() && !declaredOption.isBool() && data.length === 0 ||
                        !parsedOption.isNegative() && !declaredOption.isBool() && data[0].substr(0, 1) === "-") {
                        if (parsedError === null) {
                            parsedError = new Error("You cannot use option " + declaredOption.getName() +
                                (declaredCommand ? " in " + declaredCommand.getFull() + " command" : "") +
                                " without value.");
                        }
                        continue;
                    }

                    if (parsedCommand) {
                        if (parsedOption.isNegative()) {
                            parsedOption.setValue(false);
                        } else {
                            const optionValue: any = declaredOption.isBool() ? "true" : data.shift();
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue)
                        }
                        parsedCommand.getOptions().addOption(parsedOption);
                    } else {
                        if (parsedOption.isNegative()) {
                            parsedOption.setValue(false);
                        } else {
                            const optionValue: any = declaredOption.isBool() ? "true" : data.shift();
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue)
                        }
                        parsedProgram.getOptions().addOption(parsedOption);
                    }
                    continue;

                }

                if (/^--[a-z][\w-]*=/i.test(item)) {

                    const longName: string  = item.substr(2, item.indexOf('=') - 2),
                          optionValue: string = item.substr(item.indexOf('=') + 1),
                          declaredOption: IOptionDeclaration = (declaredCommand || declaredProgram).getOptions().findByLong(longName),
                          preparationFunction: (value: any) => any = declaredOption ? declaredOption.getPreparationFunction() || null : null;

                    if (declaredOption === null) {
                        if (parsedError === null) {
                            parsedError = new Error("You cannot use undeclared " + JSON.stringify("--" + longName) + " option" +
                                (declaredCommand ? " in " + declaredCommand.getFull() + " command." : "."));
                        }
                        continue;
                    }

                    if (parsedCommand) {
                        const parsedOption: IOptionValued = new OptionValued({
                            declaration : declaredOption,
                            original : "--" + longName
                        });
                        parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                        parsedCommand.getOptions().addOption(parsedOption);
                    } else {
                        const parsedOption: IOptionValued = new OptionValued({
                            declaration : declaredOption,
                            original : "--" + longName
                        });
                        parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                        parsedProgram.getOptions().addOption(parsedOption);
                    }
                    continue;
                }

                if (/^-[a-z]+$/i.test(item)) {

                    const listOfOptions: string[] = item.substr(1).split(""),
                          length: number = listOfOptions.length;

                    for (let index = 0; index < length; index++) {

                        const shortName: string = listOfOptions[index],
                              isLastOption: boolean = length === index + 1,
                              declaredOption: IOptionDeclaration = (declaredCommand || declaredProgram).getOptions().findByShort(shortName),
                              preparationFunction: (value: any) => any = declaredOption ? declaredOption.getPreparationFunction() || null : null;

                        if (declaredOption === null) {
                            if (parsedError === null) {
                                parsedError = new Error("You cannot use undeclared " + JSON.stringify("-" + shortName) + " option" +
                                    (declaredCommand ? " in " + declaredCommand.getFull() + " command." : "."));
                            }
                            continue;
                        }

                        if (!declaredOption.isBool() && !isLastOption ||
                            !declaredOption.isBool() && data.length === 0 ||
                            !declaredOption.isBool() && data[0].substr(0, 1) === "-") {
                            if (parsedError === null) {
                                parsedError = new Error("You cannot use option " + declaredOption.getName() +
                                    (declaredCommand ? " in " + declaredCommand.getFull() + " command" : "") +
                                    " without value.");
                            }
                            continue;
                        }

                        if (parsedCommand) {
                            const optionValue: any = declaredOption.isBool() ? "true" : data.shift(),
                                  parsedOption: IOptionValued = new OptionValued({
                                      declaration : declaredOption,
                                      original : "-" + shortName
                                  });
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                            parsedCommand.getOptions().addOption(parsedOption);
                        } else {
                            const optionValue: any = declaredOption.isBool() ? "true" : data.shift(),
                                  parsedOption: IOptionValued = new OptionValued({
                                      declaration : declaredOption,
                                      original : "-" + shortName
                                  });
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                            parsedProgram.getOptions().addOption(parsedOption);
                        }

                    }
                    continue;

                }

                if (/^-[a-z]+=/i.test(item)) {

                    const listOfOptions: string[] = item.substr(1, item.indexOf("=") - 1).split(""),
                          optionValue: string = item.substr(item.indexOf("=") + 1),
                          length: number = listOfOptions.length;

                    for (let index = 0; index < length; index++) {

                        const shortName: string = listOfOptions[index],
                              isLastOption: boolean = length === index + 1,
                              declaredOption: IOptionDeclaration = (declaredCommand || declaredProgram).getOptions().findByShort(shortName),
                              preparationFunction: (value: any) => any = declaredOption ? declaredOption.getPreparationFunction() || null : null;

                        if (declaredOption === null) {
                            if (parsedError === null) {
                                parsedError = new Error("You cannot use undeclared " + JSON.stringify("-" + shortName) + " option" +
                                    (declaredCommand ? " in " + declaredCommand.getFull() + " command." : "."));
                            }
                            continue;
                        }

                        if (!declaredOption.isBool() && !isLastOption) {
                            if (parsedError === null) {
                                parsedError = new Error("You cannot use option " + declaredOption.getName() +
                                    (declaredCommand ? " in " + declaredCommand.getFull() + " command" : "") +
                                    " without value.");
                            }
                            continue;
                        }

                        if (parsedCommand) {
                            const parsedOption: IOptionValued = new OptionValued({
                                declaration : declaredOption,
                                original : "-" + shortName
                            });
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                            parsedCommand.getOptions().addOption(parsedOption);
                        } else {
                            const parsedOption: IOptionValued = new OptionValued({
                                declaration : declaredOption,
                                original : "-" + shortName
                            });
                            parsedOption.setValue(preparationFunction ? preparationFunction(optionValue) : optionValue);
                            parsedProgram.getOptions().addOption(parsedOption);
                        }

                    }
                    continue;
                }

                if (!declaredCommand && !declaredProgram.getCommands().isEmpty()) {
                    const declaration: ICommandDeclaration = declaredProgram.getCommands().findByName(item) || declaredProgram.getCommands().findByAlias(item) || null;;
                    if (declaration === null) {
                        if (parsedError === null) {
                            parsedError = new Error("You cannot use undeclared " + JSON.stringify(item) + " command.");
                        }
                    } else {
                        parsedProgram.setCommand(new CommandValued(declaration));
                    }
                    continue;
                }

                if (declaredCommand) {
                    const declaredArgument: IArgumentDeclaration = declaredCommand.getArguments().findByIndex(parsedCommand.getArguments().getCount());
                    if (declaredArgument === null) {
                        if (parsedError === null) {
                            parsedError = new Error("You cannot use undeclared " + JSON.stringify(item) + " argument in " + parsedCommand.getFull() + " command.");
                        }
                    } else {
                        parsedCommand.getArguments().addArgument(new ArgumentValued({declaration: declaredArgument, value: item}));
                    }
                    continue;
                }

                const declaredArgument: IArgumentDeclaration = declaredProgram.getArguments().findByIndex(parsedProgram.getArguments().getCount());
                if (declaredArgument === null) {
                    if (parsedError === null) {
                        parsedError = new Error("You cannot use undeclared " + JSON.stringify(item) + " argument.");
                    }
                } else {
                    parsedProgram
                        .getArguments()
                        .addArgument(new ArgumentValued({declaration: declaredArgument, value: item}));
                }

            }

            const isProgramVersionMode: boolean = declaredProgram.getVersionOption() !== null ?
                  parsedProgram.getOptions().findByLong(declaredProgram.getVersionOption().getLong()) !== null : false,
                  isProgramHelpMode: boolean = parsedProgram.getOptions().findByLong("help") !== null,
                  isCommandHelpMode: boolean = parsedProgram.getCommand() !== null && parsedProgram.getCommand().getOptions().findByLong("help") !== null,
                  numberOfRequiredProgramArguments: number = declaredProgram.getArguments().getCountOfRequired(),
                  numberOfParsedProgramArguments: number   = parsedProgram.getArguments().getCount(),
                  numberOfRequiredCommandArguments: number = parsedProgram.getCommand() ? parsedProgram.getCommand().getDeclaration().getArguments().getCountOfRequired() : null;

            // show help information via option
            if (isProgramHelpMode || isCommandHelpMode) {
                stdout(showHelp(parsedProgram, name));
                stdout("\n");
                return getExitHandlerForProgram(this)(0);
            }

            // show version information via option
            if (isProgramVersionMode) {
                stdout("Version: " + declaredProgram.getVersion() || "undefined");
                stdout("\n");
                return getExitHandlerForProgram(this)(0);
            }

            // show parsed errors
            if (parsedError !== null) {
                throw parsedError;
            }

            // invalid number of program arguments
            if (numberOfRequiredProgramArguments !== 0 &&
                numberOfParsedProgramArguments < numberOfRequiredProgramArguments) {
                throw new Error("Invalid number of program arguments. Program require " + JSON.stringify(numberOfRequiredProgramArguments) + " argument(s).");
            }

            // invalid number of command arguments
            if (parsedProgram.getCommand() !== null &&
                !parsedProgram.getCommand().getArguments().isEmpty() &&
                parsedProgram.getCommand().getArguments().getCount() < numberOfRequiredCommandArguments) {
                throw new Error("Invalid number of command arguments. Command " + parsedProgram.getCommand().getDeclaration().getFull() + " require " + JSON.stringify(numberOfRequiredCommandArguments) + " argument(s).");
            }

            // setting program default options
            declaredProgram
                .getOptions()
                .forEach((declaredOption: IOptionDeclaration) => {
                    const isVersionOption: boolean = declaredProgram.getVersionOption() !== null &&
                        declaredOption.equal(declaredProgram.getVersionOption());
                    if (declaredOption.getLong() !== "help" &&
                        parsedProgram.getOptions().findByLong(declaredOption.getLong()) === null &&
                        parsedProgram.getOptions().findByShort(declaredOption.getShort()) === null &&
                        !isVersionOption) {
                        if (!declaredOption.isBool() && declaredOption.isRequired()) {
                            throw new Error("You should specify required option " + declaredOption.getName() + ".");
                        }
                        const defaultOption: IOptionValued = new OptionValued({
                            declaration : declaredOption,
                            original : ""
                        });
                        defaultOption.setValue(declaredOption.getPreparationFunction()(declaredOption.getDefaultValue()));
                        parsedProgram.getOptions().addOption(defaultOption);
                    }
                });

            // setting command default options
            if (parsedProgram.getCommand()) {
                parsedProgram
                    .getCommand()
                    .getDeclaration()
                    .getOptions()
                    .forEach((declaredOption: IOptionDeclaration) => {
                        if (declaredOption.getLong() !== "help" &&
                            parsedProgram.getCommand().getOptions().findByLong(declaredOption.getLong()) === null &&
                            parsedProgram.getCommand().getOptions().findByShort(declaredOption.getShort()) === null) {
                            if (!declaredOption.isBool() && declaredOption.isRequired()) {
                                throw new Error("You should specify required option " + declaredOption.getName() + " in " + parsedProgram.getCommand().getFull() + " command.");
                            }
                            const defaultOption: IOptionValued = new OptionValued({
                                declaration: declaredOption,
                                original : ""
                            });
                            defaultOption.setValue(declaredOption.getPreparationFunction()(declaredOption.getDefaultValue()));
                            parsedProgram.getCommand().getOptions().addOption(defaultOption);
                        }
                    });
            }

            // setting values for optional skipped arguments
            if (!declaredProgram.getArguments().isEmpty()) {
                declaredProgram
                    .getArguments()
                    .forEach((declaredArgument: IArgumentDeclaration) => {
                        const parsedArguments: IListValuedArguments = parsedProgram.getArguments();
                        if (parsedArguments.findByName(declaredArgument.getName()) === null) {
                            parsedArguments.addArgument(new ArgumentValued({
                                declaration: declaredArgument, value: null
                            }));
                        }
                    });
            }

            // setting values for optional skipped arguments in command
            if (parsedProgram.getCommand() &&
                !parsedProgram.getCommand().getDeclaration().getArguments().isEmpty()) {
                parsedProgram
                    .getCommand()
                    .getDeclaration()
                    .getArguments()
                    .forEach((declaredArgument: IArgumentDeclaration) => {
                        const parsedArguments: IListValuedArguments = parsedProgram.getCommand().getArguments();
                        if (!parsedArguments.findByName(declaredArgument.getName())) {
                            parsedArguments.addArgument(new ArgumentValued({
                                declaration: declaredArgument, value: null
                            }));
                        }
                    });
            }

            if (parsedProgram.getCommand() === null &&
                !declaredProgram.getCommands().isEmpty()) {
                throw new Error("You should specify command.");
            }

            if (parsedProgram.getCommand() === null) {
                if (!action) {
                    throw Error("You cannot continue without default handler.");
                }
                const args: any = {},
                      opts: any = {};
                // preparation of program options
                parsedProgram
                    .getOptions()
                    .forEach((parsedOption: IOptionValued) => {
                        if (parsedOption.getLong() !== "color") {
                            opts[parsedOption.getAttribute()] = parsedOption.getValue();
                        }
                    });
                // preparation of program arguments
                parsedProgram
                    .getArguments()
                    .forEach((parsedArgument: IArgumentValued) => {
                        const name: string = camelCase(parsedArgument.getName()),
                              value: any   = parsedArgument.getValue();
                        if (parsedArgument.isSpread()) {
                            if (!Array.isArray(args[name])) {
                                args[name] = [];
                            }
                            if (value !== null) {
                                args[name].push(value);
                            }
                        } else {
                            args[name] = value;
                        }
                    });
                setTimeout(() => action(args, opts), 0);
            } else {
                if (parsedProgram.getCommand().getDeclaration().getAction() === null) {
                    throw Error("You cannot continue without handler for " + parsedProgram.getCommand().getFull() + " command.");
                } else {
                    const args: any = {},
                          opts: any = {};
                    // preparation of command options
                    parsedProgram
                        .getOptions()
                        .forEach((parsedOption: IOptionValued) => {
                            if (parsedOption.getLong() !== "color") {
                                opts[parsedOption.getAttribute()] = parsedOption.getValue();
                            }
                        });
                    if (parsedProgram.getCommand()) {
                        parsedProgram
                            .getCommand()
                            .getOptions()
                            .forEach((parsedOption: IOptionValued) => {
                                opts[parsedOption.getAttribute()] = parsedOption.getValue();
                            });
                    }
                    // preparation of command arguments
                    parsedProgram
                        .getArguments()
                        .forEach((parsedArgument: IArgumentValued) => {
                            const name: string = camelCase(parsedArgument.getName()),
                                  value: any   = parsedArgument.getValue();
                            if (parsedArgument.isSpread()) {
                                if (!Array.isArray(args[name])) {
                                    args[name] = [];
                                }
                                if (value !== null) {
                                    args[name].push(value);
                                }
                            } else {
                                args[name] = value;
                            }
                        });
                    if (parsedProgram.getCommand()) {
                        parsedProgram
                            .getCommand()
                            .getArguments()
                            .forEach((parsedArgument: IArgumentValued) => {
                                const name: string = camelCase(parsedArgument.getName()),
                                      value: any   = parsedArgument.getValue();
                                if (parsedArgument.isSpread()) {
                                    if (!Array.isArray(args[name])) {
                                        args[name] = [];
                                    }
                                    if (value !== null) {
                                        args[name].push(value);
                                    }
                                } else {
                                    args[name] = value;
                                }
                            });
                    }
                    setTimeout(() => parsedProgram.getCommand()
                        .getDeclaration().getAction()(args, opts), 0);
                }
            }
        } catch (error) {
            showError(error, showHelp(parsedProgram, name), getStdoutHandlerForProgram(this), getStderrHandlerForProgram(this));
            return getExitHandlerForProgram(this)(1);
        }
    }

}
