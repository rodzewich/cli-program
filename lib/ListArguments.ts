import {IArgument} from './IArgument.ts';
import {IListArguments} from "./IListArguments.ts";

export class ListArguments<A extends IArgument> implements IListArguments<A> {

    protected arguments: A[] = [];

    public addArgument(argument: A): void {
        for (const arg of this.arguments) {
            if (arg.isOptional()) {
                throw new Error("You cannot declare " + JSON.stringify(argument.getName()) + " argument after optional.");
            }
            if (arg.isSpread()) {
                throw new Error("You cannot declare " + JSON.stringify(argument.getName()) + " argument after spread.");
            }
            if (arg.equal(argument)) {
                throw new Error("You cannot declare not unique " + JSON.stringify(argument.getName()) + " argument.");
            }
        }
        this.arguments.push(argument);
    }

    public forEach(callback: (value?: A, index?: number) => void): void {
        const length: number = this.arguments.length;
        for (let index = 0; index < length; index++) {
            callback(this.arguments[index], index);
        }
    }

    public getCount(): number {
        return this.arguments.length;
    }

    public findByIndex(index: number): A {
        const length: number = this.arguments.length;
        for (let i = 0; i < length; i++) {
            const argument: A = this.arguments[i];
            if (argument.isSpread()) {
                return argument;
            }
            if (i === index) {
                return argument;
            }
        }
        return null;
    }

    public findByName(name: string): A {
        for (const argument of this.arguments) {
            if (argument.getName() === name) {
                return argument;
            }
        }
        return null;
    }
    
    public getCountOfRequired(): number {
        return this.arguments.reduce((accumulator: number, argument: IArgument) => {
            if (argument.isRequired()) {
                return accumulator + 1;
            }
            return accumulator;
        }, 0);
    }

    public isEmpty(): boolean {
        return this.arguments.length === 0;
    }
    
}