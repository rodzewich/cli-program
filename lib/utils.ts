import * as path from "path";
import * as colors from "colors/safe";
import {IArgument} from "./IArgument.ts";
import {ICommand} from "./ICommand.ts";
import {IOption} from "./IOption.ts";
import {IProgramValued} from "./IProgramValued.ts";
import {ICommandValued} from "./ICommandValued.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";

export function showError(error: Error, help?: string, stdout?: (content: string) => void, stderr?: (content: string) => void): void {
    const width: number = process.stdout.columns,
          lines: string[] = error.stack.split("\n");

    function showStdout(content: string): void {
        if (typeof stdout === "function") {
            stdout(content);
        } else {
            process.stdout.write(content);
        }
    }

    function showStderr(content: string): void {
        if (typeof stdout === "function") {
            stdout(content);
        } else {
            process.stderr.write(content);
        }
    }

    if (help) {
        showStdout(help);
    }
    showStderr("\n");
    showStderr(" " + colors.bgRed(new Array(width - 1).join(" ")) + "\n");
    for (const [index, line] of lines.entries()) {
        const formattedLine: string[] = formatLine(line);
        if (index === 0) {
            for (const line of formattedLine) {
                showStderr(" " + colors.bgRed(colors.yellow(colors.bold(" " + line + " "))) + "\n");
            }
        } else {
            for (const line of formattedLine) {
                showStderr(" " + colors.bgRed(colors.white(" " + line + " ")) + "\n");
            }
        }
    }
    showStderr(" " + colors.bgRed(new Array(width - 1).join(" ")) + "\n");
    showStderr("\n");
}

export function formatLine(line: string): string[] {
    const width: number = process.stdout.columns;
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

export function showHelp(program: IProgramValued): string {
    const fileExtension: string = path.extname(process.argv[1]),
          fileName: string  = path.basename(process.argv[1], fileExtension);
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
