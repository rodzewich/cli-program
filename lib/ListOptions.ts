import {IListOptions} from "./IListOptions.ts";
import {IOption} from './IOption.ts';
import kebabCase = require("lodash.kebabcase");
import {getFullOptionName} from "./utils.ts";

export class ListOptions<O extends IOption> implements IListOptions<O> {
    
    private _options: O[] = [];

    public addOption(option: O): void {
        for (const opt of this._options) {
            if (opt.equal(option)) {
                throw new Error("You cannot declare not unique " + getFullOptionName(option) + " option.");
            }           
        }
        this._options.push(option);
    }
    
    public findByShort(short: string): O {
        for (const option of this._options) {
            if (short === option.getShort()) {
                return option;
            }
        }
        return null;
    }
    
    public findByLong(long: string): O {
        for (const option of this._options) {
            const value: string = option.getLong(),
                  negatives: string[] = option.getNegativePrefixes()
                      .map((negative: string) => negative + "-" + kebabCase(value));
            if (kebabCase(long) === kebabCase(value)) {
                return option;
            }
            if (negatives.indexOf(kebabCase(long)) !== -1) {
                return option;
            }
        }
        return null;
    }
    
    public forEach(callback: (value?: O, index?: number) => void): void {
        const length: number = this._options.length;
        for (let index = 0; index < length; index++) {
            callback(this._options[index], index);
        }
    }

    public getCount(): number {
        return this._options.length;
    }

    public isEmpty(): boolean {
        return this._options.length === 0;
    }

}