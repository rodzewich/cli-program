import {ListArguments} from "./ListArguments.ts";
import {IListValuedArguments} from "./IListValuedArguments.ts";
import {IArgumentValued} from "./IArgumentValued.ts";

export class ListValuedArguments extends ListArguments<IArgumentValued> implements IListValuedArguments {

    public addArgument(argument: IArgumentValued): void {
        this.arguments.push(argument);
    }

}
