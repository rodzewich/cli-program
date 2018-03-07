import {IListCommands} from "./IListCommands.ts";
import {ICommandDeclaration} from "./ICommandDeclaration.ts";
import kebabCase = require("lodash.kebabcase");

export class ListCommands implements IListCommands {

    private commands: ICommandDeclaration[] = [];

    public addCommand(command: ICommandDeclaration): void {
        for (const cmd of this.commands) {
            const keys: string[] = [kebabCase(cmd.getAlias()), kebabCase(cmd.getName())].filter(Boolean);
            if (keys.indexOf(command.getAlias()) !== -1 ||
                keys.indexOf(command.getName()) !== -1) {
                throw new Error("You cannot declare not unique command " + command.getFull() + ".");
            }
        }
        this.commands.push(command);
    }

    public forEach(callback: (value?: ICommandDeclaration, index?: number) => void): void {
        const length: number = this.commands.length;
        for (let index = 0; index < length; index++) {
            callback(this.commands[index], index);
        }
    }

    public getCount(): number {
        return this.commands.length;
    }

    public findByAlias(alias: string): ICommandDeclaration {
        for (const command of this.commands) {
            if (command.getAlias() === alias) {
                return command;
            }
        }
        return null;
    }

    public findByName(name: string): ICommandDeclaration {
        for (const command of this.commands) {
            if (command.getName() === name) {
                return command;
            }
        }
        return null;
    }

    public hasArguments(): boolean {
        for (const command of this.commands) {
            if (!command.getArguments().isEmpty()) {
                return true;
            }
        }
        return false;
    }

    public hasOptions(): boolean {
        for (const command of this.commands) {
            if (!command.getOptions().isEmpty()) {
                return true;
            }
        }
        return false;
    }

    public isEmpty(): boolean {
        return this.commands.length === 0;
    }

}