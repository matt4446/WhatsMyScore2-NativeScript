import { Control } from "../../decorators/control";
import { ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { CardView } from "cardview";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { Color } from "color";
@Control({
    selector: "nx-card",
    //templateUrl: "controls/list/list.html",
    template:`
    <CardView #item shadowColor="#FE00FC" elevation="10" margin="10">
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
        let cardView: any = item.nativeElement;
        //cardView.shadowColor = new Color("#FF0000").android;
    }
}