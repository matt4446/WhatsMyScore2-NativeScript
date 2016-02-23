import { Control } from "../../decorators/control";
import { ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { CardView } from "cardview";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Directive({
    selector: "CardView",
})
export class MainCardView {
    public cardView: CardView;

    constructor(private element: ElementRef) {
        this.cardView = element.nativeElement;
    }
    

}

@Control({
    selector: "nx-card",
    //templateUrl: "controls/list/list.html",
    template:`
    <CardView margin="10">
        <ng-content></ng-content>
    </CardView>
    `,
    directives: [MainCardView],
    inputs:["padding", "margin"]
})
export class NxCard {
    constructor(
        private owner: MainCardView
    ) 
    {
    }
   
}