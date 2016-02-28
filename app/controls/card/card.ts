import { Control } from "../../decorators/control";
import { ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { CardView } from "cardview";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Control({
    selector: "nx-card",
    //templateUrl: "controls/list/list.html",
    template:`
    <CardView #item>
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
    </CardView>
    `
})
export class NxCard {
    constructor() 
    {
    }
    
    @ViewChild('item') 
    set _listItems(item: ElementRef){
        let cardView: CardView = item.nativeElement
    }
}