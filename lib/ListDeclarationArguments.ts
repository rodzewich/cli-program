import {ListArguments} from "./ListArguments.ts";
import {IListDeclarationArguments} from "./IListDeclarationArguments.ts";
import {IArgumentDeclaration} from "./IArgumentDeclaration.ts";

export class ListDeclarationArguments
       extends ListArguments<IArgumentDeclaration>
       implements IListDeclarationArguments {
}
