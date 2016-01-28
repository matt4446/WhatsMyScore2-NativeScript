import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { NxListItem } from "./list-item";
import { NxHeader } from "./header";
//var observable = require("data/observable");

@Control({
    selector: "nx-list",
    //templateUrl: "controls/list/list.html",
    template:`
    <Border borderRadius="0" borderWidth="1" borderColor="#eeeeee">
    <StackLayout>
        <StackLayout>
            <ng-content select="[item-top]"></ng-content>
        </StackLayout>
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
        <StackLayout>
            <ng-content select="[item-bottom]"></ng-content>
        </StackLayout>
    </StackLayout>
    </Border>
    `,
    directives: [ NxListItem, NxHeader ],
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
    
    //this should give me a list of shadow elements in ng-content
    @ContentChildren(NxListItem)
    set _listItems(items: any){
        this.logger.Notify("Setting list item nodes");
        var children: Array<NxListItem> = items.toArray();
        this.logger.Notify("" + children.length);
        //these items will be wrapped in a stack panel.
        // children.forEach((item : NxListItem) => {
        //     var stackPanel = item.Element;
        //     stackPanel.animate({
        //         opacity: 1,
        //         duration: 3000,
        //         translate: {
        //             x : 10,
        //             y: 0
        //         }
        //     })
        // });
        
    }
}

export interface ISearchEvent
{
    Value: string;
}