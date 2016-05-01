/// <reference path="../../../node_modules/nativescript-pulltorefresh/pulltorefresh.d.ts" />
import { Logger } from "../../providers/logger";
import { Control } from "../../decorators/control";
import { Component } from "angular2/core";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { PullToRefresh } from "nativescript-pulltorefresh";

@Control({
    selector: "nx-pull-to-refresh",
    template:`
    <PullToRefresh #item (refresh)="refreshMe($event)">
        <ScrollView>
            <StackLayout>
                <ng-content></ng-content>
            </StackLayout>
        </ScrollView>
    </PullToRefresh>
    `,
    outputs: ["refreshStarted"],
    //inputs: ["complete"]
})

export class NxPullToRefresh {
    
    constructor(private logger: Logger)
    {
        this.logger.Notify("NxPullToRefresh - started");
    }
    
    @ViewChild("item")
    public pullToRefreshElement : ElementRef;
    
    private refreshMe(args : any){
        console.log("refresh called. args:");
        console.log(args);
        
        this.refreshStarted.next(args);
    }
       
    public refreshStarted = new EventEmitter();
}

