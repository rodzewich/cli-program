import {ListOptions} from "./ListOptions.ts";
import {IListDeclarationOptions} from "./IListDeclarationOptions.ts";
import {IOptionDeclaration} from "./IOptionDeclaration.ts";

export class ListDeclarationOptions 
       extends ListOptions<IOptionDeclaration> 
       implements IListDeclarationOptions {}