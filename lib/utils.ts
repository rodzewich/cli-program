import * as path from "path";
import * as colors from "colors/safe";
import {IArgument} from "./IArgument.ts";
import {ICommand} from "./ICommand.ts";
import {IOption} from "./IOption.ts";
import {IProgramValued} from "./IProgramValued.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import {IProgramDeclaration} from "./IProgramDeclaration.ts";
import {IProgramWrapper} from "./IProgramWrapper.ts";
import {ICommandWrapper} from "./ICommandWrapper";

const programs: [IProgramWrapper, IProgramDeclaration][]  = [],
      commands: [ICommandWrapper, ICommandDeclaration][]  = [],
      connects: [IProgramWrapper, ICommandWrapper[]][]    = [],
      stdout: [IProgramWrapper, (text: string) => void][] = [],
      stderr: [IProgramWrapper, (text: string) => void][] = [],
      exits: [IProgramWrapper, (code: number) => void][]  = [];

export function setExitHandlerForProgram(program: IProgramWrapper, handler: (code: number) => void): void {
    const foundHandler: [IProgramWrapper, (code: number) => void] = exits
            .filter((item: [IProgramWrapper, (code: number) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        foundHandler[1] = handler;
    } else {
        exits.push([program, handler]);
    }
}

export function getExitHandlerForProgram(program: IProgramWrapper): (code: number) => void {
    return exits
            .filter((item: [IProgramWrapper, (code: number) => void]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, (code: number) => void]) => item[1])[0] || function (code: number): void {process.exit(code)};
}

export function getExitHandlerForCommand(command: ICommandWrapper): (code: number) => void {
    return getExitHandlerForProgram(connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item[1].indexOf(command) !== -1)
            .map((item: [IProgramWrapper, ICommandWrapper[]]) => item[0])[0] || null);
}

function removeExitHandlerForProgram(program: IProgramWrapper): void {
    const foundHandler: [IProgramWrapper, (code: number) => void] = exits
            .filter((item: [IProgramWrapper, (code: number) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        exits.splice(exits.indexOf(foundHandler), 1);
    }
}

export function setStdoutHandlerForProgram(program: IProgramWrapper, handler: (text: string) => void): void {
    const foundHandler: [IProgramWrapper, (text: string) => void] = stdout
            .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        foundHandler[1] = handler;
    } else {
        stdout.push([program, handler]);
    }
}

export function getStdoutHandlerForProgram(program: IProgramWrapper): (text: string) => void {
    return stdout
            .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, (text: string) => void]) => item[1])[0] || function (text: string): void {process.stdout.write(text)};
}

export function getStdoutHandlerForCommand(command: ICommandWrapper): (text: string) => void {
    return getStdoutHandlerForProgram(connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item[1].indexOf(command) !== -1)
            .map((item: [IProgramWrapper, ICommandWrapper[]]) => item[0])[0] || null);
}

function removeStdoutHandlerForProgram(program: IProgramWrapper): void {
    const foundHandler: [IProgramWrapper, (text: string) => void] = stdout
            .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        stdout.splice(stdout.indexOf(foundHandler), 1);
    }
}

export function setStderrHandlerForProgram(program: IProgramWrapper, handler: (text: string) => void): void {
    const foundHandler: [IProgramWrapper, (text: string) => void] = stderr
            .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        foundHandler[1] = handler;
    } else {
        stderr.push([program, handler]);
    }
}

export function getStderrHandlerForProgram(program: IProgramWrapper): (text: string) => void {
    return stderr
            .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, (text: string) => void]) => item[1])[0] || function (text: string): void {process.stderr.write(text)};
}

export function getStderrHandlerForCommand(command: ICommandWrapper): (text: string) => void {
    return getStderrHandlerForProgram(connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item[1].indexOf(command) !== 1)
            .map((item: [IProgramWrapper, ICommandWrapper[]]) => item[0])[0] || null);
}

function removeStderrHandlerForProgram(program: IProgramWrapper): void {
    const foundHandler: [IProgramWrapper, (text: string) => void] = stderr
        .filter((item: [IProgramWrapper, (text: string) => void]) => item.indexOf(program) === 0)[0] || null;
    if (foundHandler) {
        stderr.splice(stderr.indexOf(foundHandler), 1);
    }
}

export function addCommandToProgram(program: IProgramWrapper, command: ICommandWrapper): void {
    const foundCommands: ICommandWrapper[] = connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, ICommandWrapper[]]) => item[1])[0] || null;
    if (foundCommands) {
        foundCommands.push(command);
    }
}

export function getCommandsInProgram(program: IProgramWrapper): ICommandWrapper[] {
    return connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, ICommandWrapper[]]) => item[1].slice())[0] || null;
}

export function removeCommandsInProgram(program: IProgramWrapper): void {
    const foundCommand: [IProgramWrapper, ICommandWrapper[]] = connects
            .filter((item: [IProgramWrapper, ICommandWrapper[]]) => item.indexOf(program) === 0)[0] || null;
    if (foundCommand) {
        connects.splice(connects.indexOf(foundCommand), 1);
    }
}

export function setProgramDeclaration(program: IProgramWrapper, declaration: IProgramDeclaration): void {
    const foundProgram: [IProgramWrapper, IProgramDeclaration] = programs
            .filter((item: [IProgramWrapper, IProgramDeclaration]) => item.indexOf(program) === 0)[0] || null;
    if (foundProgram) {
        foundProgram[1] = declaration;
    } else {
        programs.push([program, declaration]);
    }
}

export function getProgramDeclaration(program: IProgramWrapper): IProgramDeclaration {
    return programs
            .filter((item: [IProgramWrapper, IProgramDeclaration]) => item.indexOf(program) === 0)
            .map((item: [IProgramWrapper, IProgramDeclaration]) => item[1])[0] || null;
}

export function removeProgramDeclaration(program: IProgramWrapper): void {
    const foundProgram: [IProgramWrapper, IProgramDeclaration] = programs
            .filter((item: [IProgramWrapper, IProgramDeclaration]) => item.indexOf(program) === 0)[0] || null;
    if (foundProgram) {
        programs.splice(programs.indexOf(foundProgram), 1);
        const commands: ICommandWrapper[] = getCommandsInProgram(foundProgram[0]);
        if (commands) {
            for (const command of commands) {
                removeCommandDeclaration(command);
            }
        }
        removeStdoutHandlerForProgram(foundProgram[0]);
        removeStderrHandlerForProgram(foundProgram[0]);
        removeExitHandlerForProgram(foundProgram[0]);
        removeCommandsInProgram(foundProgram[0]);
    }
}

export function setCommandDeclaration(command: ICommandWrapper, declaration: ICommandDeclaration): void {
    const foundCommand: [ICommandWrapper, ICommandDeclaration] = commands
            .filter((item: [ICommandWrapper, ICommandDeclaration]) => item.indexOf(command) === 0)[0] || null;
    if (foundCommand) {
        foundCommand[1] = declaration;
    } else {
        commands.push([command, declaration]);
    }
}

export function getCommandDeclaration(command: ICommandWrapper): ICommandDeclaration {
    return commands
            .filter((item: [ICommandWrapper, ICommandDeclaration]) => item.indexOf(command) === 0)
            .map((item: [ICommandWrapper, ICommandDeclaration]) => item[1])[0] || null;
}

export function removeCommandDeclaration(command: ICommandWrapper): void {
    const foundCommand: [ICommandWrapper, ICommandDeclaration] = commands
            .filter((item: [ICommandWrapper, ICommandDeclaration]) => item.indexOf(command) === 0)[0] || null;
    if (foundCommand) {
        commands.splice(commands.indexOf(foundCommand), 1);
    }
}

export function showError(error: Error, help: string, stdout: (text: string) => void, stderr: (text: string) => void): void {
    const width: number = process.stdout.columns || 80,
          lines: string[] = error.stack.split("\n");
    if (help) {
        stdout(help);
    }
    stderr("\n");
    stderr(" " + colors.bgRed(new Array(width - 1).join(" ")) + "\n");
    for (const [index, line] of lines.entries()) {
        const formattedLine: string[] = formatLine(line);
        if (index === 0) {
            for (const line of formattedLine) {
                stderr(" " + colors.bgRed(colors.yellow(colors.bold(" " + line + " "))) + "\n");
            }
        } else {
            for (const line of formattedLine) {
                stderr(" " + colors.bgRed(colors.white(" " + line + " ")) + "\n");
            }
        }
    }
    stderr(" " + colors.bgRed(new Array(width - 1).join(" ")) + "\n");
    stderr("\n");
}

export function formatLine(line: string): string[] {
    const width: number = process.stdout.columns || 80;
    const result: string[] = [];
    while (line.length > width - 4) {
        result.push(line.substr(0, width - 4));
        line = line.substr(width - 3);
    }
    if (line.length > 0) {
        result.push(line + new Array(width - line.length - 3).join(" "));
    }
    return result;
}

export function getCountOfRequireArguments<A extends IArgument>(args: A[]): number {
    for (const [i, arg] of args.entries()) {
        if (arg.isOptional()) {
            return i;
        }
    }
    return args.length;
}

export function findArgumentByIndex<A extends IArgument>(index: number, args: A[]): A {
    for (const [i, arg] of args.entries()) {
        if (arg.isSpread()) {
            return arg;
        }
        if (i === index) {
            return arg;
        }
    }
    return null;
}

export function findCommandByName<C extends ICommand<any, any>>(name: string, commands: C[]): C {
    for (const command of commands) {
        if (name === command.getName()) {
            return command;
        }
    }
    return null;
}

export function findCommandByAlias<C extends ICommand<any, any>>(alias: string, commands: C[]): C {
    for (const command of commands) {
        if (alias === command.getAlias()) {
            return command;
        }
    }
    return null;
}

export function findOptionByShort<O extends IOption>(short: string, options: O[]): O {
    for (const option of options) {
        if (short === option.getShort()) {
            return option;
        }
    }
    return null;
}

export function findOptionByLong<O extends IOption>(long: string, options: O[]): O {
    for (const option of options) {
        if (long === option.getLong()) {
            return option;
        }
    }
    return null;
}

export function showHelp(program: IProgramValued, name: string): string {
    const fileExtension: string = path.extname(name),
          fileName: string  = path.basename(name, fileExtension);
    let optionWidth: number = 0;

    function showName(): string[] {
        return [
            colors.bold(program.getName() || fileName),
            ""
        ];
    }

    function showDescription(): string[] {
        const description: string = program.getDescription();
        if (description) {
            return [
                "  " + description,
                ""
            ];
        }
        return [];
    }

    function showUsage(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null;
        const usage: string[] = [
            fileName
        ];
        if (command) {
            if (program.getDeclaration().getOptions().length !== 0) {
                usage.push("[options...]");
            }
            usage.push(command.getName());
            usage.push(command.getUsage());
        } else {
            usage.push(program.getUsage());
        }
        return [
            colors.bold("Usage:"),
            "",
            "  " + usage.join(" "),
            ""
        ];
    }

    function showGeneralOptions(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null,
              options: IOptionDeclaration[] = program.getDeclaration().getOptions(),
              content: string[] = [];
        if (options.length !== 0) {
            if (command && command.getOptions().length !== 0) {
                content.push(colors.bold("General Options:"));
            } else {
                content.push(colors.bold("Options:"));
            }
            content.push("");
        }
        content.push(...showOptions(options));
        content.push("");
        return content;
    }

    function showExamplesColors(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null,
              content: string[] = [];
        if (!command) {
            content.push(colors.bold("Examples for Color:"));
            content.push("");
            content.push("  $ " + fileName + " --no-color " + program.getUsage());
            content.push("  $ " + fileName + " --color=false " + program.getUsage());
            content.push("  $ " + fileName + " --color " + program.getUsage());
            content.push("  $ " + fileName + " --color=true " + program.getUsage());
            content.push("  $ " + fileName + " --color=always " + program.getUsage());
            content.push("");
        }
        return content;
    }

    function showCommandOptions(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null,
              options: IOptionDeclaration[] = command ? command.getDeclaration().getOptions() : [],
              content: string[] = [];
        if (command) {
            if (options.length !== 0) {
                if (program.getDeclaration().getOptions().length !== 0) {
                    content.push(colors.bold("Command Options:"));
                } else {
                    content.push(colors.bold("Options:"));
                }
                content.push("");
            }
            content.push(...showOptions(options));
            content.push("");
        }
        return content;
    }

    function showOptions(options: IOptionDeclaration[]): string[] {
        const content: string[] = [];
        optionWidth = options.reduce((accumulator: number, option: IOptionDeclaration) => {
            return Math.max(accumulator, showOption(option, true, true, true, null).length);
        }, optionWidth);

        if (options.length !== 0) {
            for (const option of options) {
                const widthDiff: number = optionWidth - showOption(option, true, true, true, null).length;
                content.push(showOption(option, false, false, false, widthDiff));
            }
        }
        return content;
    }

    function showOption(option: IOptionDeclaration, withoutNegative: boolean = false, withoutDescription: boolean = false, withoutColors: boolean = false, widthDiff: number = null): string {
        const content: string[] = [],
              short: string = option.getShort(),
              long: string  = option.getLong(),
              description: string  = option.getDescription(),
              coloredShort: string = short ? bold("-" + short) : null,
              coloredLong: string  = long ? bold("--" + long) : null,
              negativePrefixes: string[] = option.getNegativePrefixes();
        if (!withoutNegative && negativePrefixes && negativePrefixes.length !== 0) {
            for (const prefix of negativePrefixes) {
                content.push("  " + bold("--" + prefix + "-" + long) + ",\n");
            }
        }
        content.push("  " + [coloredShort, coloredLong].filter(Boolean).join(", "));
        if (option.isRequired() && !option.isBool()) {
            content.push(" <" + option.getType() + ">");
        } else if (!option.isBool()) {
            content.push(" [" + option.getType() + "=" + JSON.stringify(option.getDefaultValue()) + "]");
        }
        if (widthDiff) {
            content.push(new Array(widthDiff + 1).join(" "))
        }
        if (description && !withoutDescription) {
            content.push(" " + description);
        }
        return content.join("");

        function bold(str: string): string {
            if (withoutColors) {
                return str;
            }
            return colors.bold(str);
        }

    }

    function showCommands(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null,
              commands: ICommandDeclaration[] = program.getDeclaration().getCommands(),
              content: string[] = [];
        if (!command) {
            content.push(colors.bold("Commands:"));
            content.push("");
            for (const cmd of commands) {
                content.push("  " + colors.bold(cmd.getName()) +
                    (cmd.getAlias() ? " (alias: " + cmd.getAlias() + ")" : "")
                    + " " + showArguments(cmd.getArguments()) + "\n    " + cmd.getDescription());
                content.push("");
            }
        }
        return content;
    }

    function showArguments(args: IArgument[]): string {
        const content: string[] = [];
        for (const arg of args) {
            if (arg.isRequired()) {
                content.push("<" + arg.getName() + ">");
            } else if (!arg.isSpread()) {
                content.push("[" + arg.getName() + "]");
            } else {
                content.push("[" + arg.getName() + "...]");
            }
        }
        return content.join(" ");
    }

    function showCommandDescription(): string[] {
        const command: ICommandValued = program.getCommands()[0] || null;
        if (command && command.getDeclaration()) {
            return [
                colors.bold("Description:"),
                "",
                "  " + command.getDescription(),
                ""
            ];
        }
        return [];
    }

    return [
        ...showName(),
        ...showDescription(),
        ...showUsage(),
        ...showCommandDescription(),
        ...showGeneralOptions(),
        ...showCommands(),
        ...showCommandOptions(),
        ...showExamplesColors()
    ].join("\n");
}
