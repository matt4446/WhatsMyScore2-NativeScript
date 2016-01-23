import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { NxListItem } from "./list-item";
//var observable = require("data/observable");

@Control({
    selector: "nx-list",
    //templateUrl: "controls/list/list.html",
    template:`
    <StackLayout>
        <label text='list'></label>
        <ng-content></ng-content>
    </StackLayout>
    `,
    directives: [ NxListItem ],
    inputs:["padding"]
})
export class NxList {
    //@Input() //see @control - inputs
    public padding : boolean = false;
    
    constructor(private logger: Logger)
    {
        this.logger.Notify("NxList control Started");
    }
    
    public HasPadding(){
        if(this.padding){
            return "padding";
        }
    }   
    
    @ContentChildren(NxListItem)
    set _listItems(items){
        this.logger.Notify("Setting a list item");
    }
}

export interface ISearchEvent
{
    Value: string;
}