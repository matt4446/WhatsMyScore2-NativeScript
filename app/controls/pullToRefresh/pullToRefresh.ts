/// <reference path="../../../node_modules/nativescript-pulltorefresh/pulltorefresh.d.ts" />

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
    <PullToRefresh (refresh)="refreshMe($event)">
        <ScrollView>
            <StackLayout>
                <ng-content></ng-content>
            </StackLayout>
        </ScrollView>
    </PullToRefresh>
    `,
    outputs: ["refresh"],
    //inputs: ["complete"]
})

export class NxPullToRefresh {
    
    private pullToRefreshControl : PullToRefresh;
    
    constructor(public element: ElementRef)
    {
        console.log("PullToRefreshComponent added");
        let pullToRefreshElement: PullToRefresh = element.nativeElement;
        console.log(pullToRefreshElement);
    }
    
    private complete: boolean;
    
    // @Input("complete")
    // set _complete (value: boolean){
    //     this.complete = value;
    // }
    
    public refreshMe(args : any){
        console.log("refresh called. args:");
        console.log(args);
        
        this.refresh.next(args);
    }
    
    public refresh = new EventEmitter()
    
}

