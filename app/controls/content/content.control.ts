import { Control } from "../../decorators/control";
import { HostListener, ElementRef, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild, TemplateRef, OnInit, AfterViewInit } from "angular2/core";
import { Logger } from "../../providers/logger";
import { Button } from "ui/button";
import { StackLayout} from "ui/layouts/stack-layout";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { NxPullToRefresh } from '../pullToRefresh/pullToRefresh.control'; 
import { PullToRefresh } from "nativescript-pulltorefresh";
import { AnimationPromise } from "ui/animation";

@Control({
    selector:"nx-content",
    template: `
    <GridLayout>
        <nx-pull-to-refresh #refreshControl (refreshStarted)="refreshPage($event)">
            <StackLayout #body>
                <ng-content></ng-content>
            </StackLayout>
        </nx-pull-to-refresh>
        <ActivityIndicator [busy]="isLoading" [visibility]="isLoading ? 'visible' : 'collapse'" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
    </GridLayout>
    `,
    providers: [],
    directives: [NxPullToRefresh],
    outputs: ["refreshStarted", "refreshCompleted"]
})
export class NxContent implements OnInit, AfterViewInit {
    private template: TemplateRef;
    private container: ElementRef;
    
    constructor(private logger:Logger)
    {
        this.logger.Notify("nx-content added");    
    }

    public ngOnInit(){
    }
    
    public ngAfterViewInit(){
    }

    @Input()
    public isLoading : boolean = false;
    
    @ViewChild("body")
    private body : ElementRef; 
    
    @ContentChild(NxPullToRefresh)
    private content : ElementRef;
        
    @Input()
    public refreshComplete : boolean = true;
        
    private transition: AnimationPromise = null; 
    
    private shrink(){
        let stackLayout: StackLayout = this.body.nativeElement;
        let animation = stackLayout.animate({ opacity : 0.2, scale: { x : 0.5, y: 0.5 } });
        animation.then(() => {
            let innerAnimation = stackLayout.animate({ opacity: 0, translate: { x: -1000, y: 0 }});
            return innerAnimation;
        });
        this.transition = animation;
    }
    private grow(){
        let stackLayout: StackLayout = this.body.nativeElement;
        
        let fadeIn = () => { 
            this.logger.Notify("fade in");
            stackLayout.translateX = 0;
            return stackLayout.animate({ opacity : 1, scale: { x : 1, y: 1 }, translate: { x: 0, y: 0} }) 
        };
        
        this.logger.Notify("add animation to previous");
        this.transition
            .then(fadeIn);
        
    }
    
    private refreshPage(args){
        let refreshCompleted = () => { 
                this.logger.Notify("refresh completed");
                args.object.refreshing = false;
                this.refreshContentCompleted({});
            };
        
        this.refreshStarted.next({
            object: args.object,
            complete: refreshCompleted,
            completed : refreshCompleted,
            
        });
        
        this.shrink();
    }
    
    private refreshContentCompleted($event){
        this.refreshCompleted.next($event);
        this.grow();   
    }
        
    public refreshStarted = new EventEmitter();
    public refreshCompleted = new EventEmitter();
}