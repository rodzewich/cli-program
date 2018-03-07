import {ListOptions} from "./ListOptions.ts";
import {IListValuedOptions} from "./IListValuedOptions.ts";
import {IOptionValued} from "./IOptionValued.ts";

export class ListValuedOptions
       extends ListOptions<IOptionValued>
       implements IListValuedOptions {}