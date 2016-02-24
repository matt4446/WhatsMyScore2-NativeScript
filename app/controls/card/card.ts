import { Control } from "../../decorators/control";
import { ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { CardView } from "cardview";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Control({
    selector: "nx-card",
    //templateUrl: "controls/list/list.html",
    template:`
    <CardView>
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
    </CardView>
    `,
    inputs:["padding", "margin"]
})
export class NxCard {
    constructor() 
    {
    }
}