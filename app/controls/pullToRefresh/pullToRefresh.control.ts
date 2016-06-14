/// <reference path="../../../node_modules/nativescript-pulltorefresh/pulltorefresh.d.ts" />
import { Logger } from "../../providers/logger";
import { Control } from "../../decorators/control";
import { Component, OnInit } from "@angular/core";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren, ContentChild } from "@angular/core";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { PullToRefresh } from "nativescript-pulltorefresh";
import { ListViewComponent } from "nativescript-angular/directives/list-view-comp";
import { ListView } from "ui/list-view";
import { StackLayout} from "ui/layouts/stack-layout";
import { AnimationPromise } from "ui/animation";

@Directive({
    selector: "[pull-to-animate]"
})
export class PullToRefreshAnimateBody{
    
    constructor(private element : ElementRef){

    }

    public get Element() : StackLayout{
        return this.element.nativeElement;
    } 
}

@Directive({
    selector: "[pull-list-view]",
    //outputs: ["refreshStarted", "refreshCompleted"],
    host: {
        "(refresh)" : "refreshMe($event)"
    } ,
    
})
export class NxPullListView{
    
    constructor(private element: ElementRef, private logger: Logger){
        this.logger.Notify("listview - that i want to pull");
        this.logger.NotifyObjectProperties(element.nativeElement);
        this.logger.Notify(element.nativeElement.typeName);
    }

    public get Component(): ListView{
        let component :ListViewComponent = this.element.nativeElement;
        let anon: any = component;

        let realThing : ListView = anon.listView ;
        return realThing;
    }

    @Output("refreshStarted")
    public refreshStarted = new EventEmitter();
    @Output("refreshCompleted")
    public refreshCompleted = new EventEmitter();

    private refreshMe(args : any){
        this.logger.Notify("Refresh notified in the directive NxPullListView");

        var notifyRefreshCompleted = () => { 
            args.object.refreshing = false;
            
            this.refreshCompleted.next({
                object: args.object
            });
        };
        
        this.refreshStarted.next({
            object: args.object,
            completed : notifyRefreshCompleted
        });

    }

}

@Control({
    selector: "nx-pull-to-refresh",
    template:`
    <PullToRefresh #item [pull-list-view] 
        (refreshStarted)="refreshMeStarted($event)" 
        (refreshCompleted)="refreshMeCompleted($event)">
        <ScrollView>
            <StackLayout>
                <ng-content></ng-content>
            </StackLayout>
        </ScrollView>
    </PullToRefresh>
    `,
    directives: [NxPullListView, PullToRefreshAnimateBody],
    outputs: ["refresh", "refreshCompleted"],
    //inputs: ["complete"]
})

export class NxPullToRefresh {
    

    constructor(private logger: Logger)
    {
        this.logger.Notify("NxPullToRefresh - started");
    }
    
    @ViewChild("item")
    public pullToRefreshElement : ElementRef;
    
    @Output("refreshStarted")
    public refreshStarted = new EventEmitter();
    @Output("refreshCompleted")
    public refreshCompleted = new EventEmitter();

    private refreshMeStarted(args : any){
        this.refreshStarted.next(args);
        this.shrink();
    }
    
    private refreshMeCompleted($event){
        console.log("completed");
        this.refreshCompleted.next($event);
        this.grow(); 
    }


    private animateChildren: PullToRefreshAnimateBody[];
    @ContentChildren(PullToRefreshAnimateBody, { descendants: true })
    public set contentChildren(items){
        this.animateChildren = items.toArray();
    }

    private transition: AnimationPromise = null; 
    private shrink(){
        this.animateChildren.forEach((child) => {
            let stackLayout = child.Element;
            let animation = stackLayout.animate({ opacity : 0.2, scale: { x : 0.5, y: 0.5 } });
            animation.then(() => {
                let innerAnimation = stackLayout.animate({ opacity: 0, translate: { x: -1000, y: 0 }});
                return innerAnimation;
            });
            this.transition = animation;
        });
    }
    
    private grow(){
        this.animateChildren.forEach((child) => {
            let stackLayout = child.Element;
        
            let fadeIn = () => { 
                console.log("fade in");
                stackLayout.translateX = 0;
                return stackLayout.animate({ opacity : 1, scale: { x : 1, y: 1 }, translate: { x: 0, y: 0} }) 
            };
            
            this.transition
                .then(fadeIn);
        });
        
        
    }
       
    
}

