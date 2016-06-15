import { Control } from "../../decorators/control";
import { HostListener, ElementRef, Input, Output, EventEmitter, 
    ContentChildren,ContentChild, ViewChild, TemplateRef, OnInit, AfterViewInit } from "@angular/core";
import { Logger } from "../../providers/logger";
import { Button } from "ui/button";
import { StackLayout} from "ui/layouts/stack-layout";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { NxPullToRefresh, PullToRefreshAnimateElement } from '../pullToRefresh/pullToRefresh.control'; 
import { PullToRefresh } from "nativescript-pulltorefresh";
import { AnimationPromise } from "ui/animation";

@Control({
    selector:"nx-content",
    template: `
    <GridLayout>
        <nx-pull-to-refresh #refreshControl 
            (refreshStarted)="refreshPage($event)"
            (refreshCompleted)="refreshPageCompleted($event)">
            <StackLayout [pull-to-animate]>
                <ng-content></ng-content>
            </StackLayout>
        </nx-pull-to-refresh>
        <ActivityIndicator [busy]="isLoading" [visibility]="isLoading ? 'visible' : 'collapse'" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    </GridLayout>
    `,
    providers: [],
    directives: [NxPullToRefresh, PullToRefreshAnimateElement]
})
export class NxContent implements OnInit, AfterViewInit {
    //private template: TemplateRef;
    private container: ElementRef;
    
    constructor(private logger:Logger)
    {
        this.logger.Notify("nx-content added");    
    }

    public ngOnInit(){ }
    
    public ngAfterViewInit(){ }

    @Input()
    public isLoading : boolean = false;
    
    @ContentChild(NxPullToRefresh)
    private content : ElementRef;
        
    @Input()
    public refreshComplete : boolean = true;
        
    private transition: AnimationPromise = null; 
        
    private refreshPage(args){      
        this.logger.Notify("content restart ->"); 
        this.refreshStarted.next(args);
        this.isLoading = true;
    }
    
    private refreshPageCompleted($event){
        this.refreshCompleted.next($event); 
        this.isLoading = false; 
    }
    
    @Output("refreshStarted")
    public refreshStarted = new EventEmitter();
    @Output("refreshCompleted")
    public refreshCompleted = new EventEmitter();
}