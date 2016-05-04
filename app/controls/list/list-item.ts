import { Control } from "../../decorators/control";
import { HostListener, ElementRef, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "@angular/core";
import { Logger } from "../../providers/logger";
import { Button } from "ui/button";
import { StackLayout} from "ui/layouts/stack-layout";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { Router, Instruction} from '@angular/router';

@Control({
    selector:"nx-item",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    //https://github.com/NativeScript/NativeScript/issues/859 -- cant get per side border yet. 
    template: `
    <StackLayout #item style="opacity:1">
        <Border height="2" borderRadius="0" borderWidth="1" borderColor="#548CEC"></Border>
        <GridLayout  columns="50, *, 42" rows="auto" class="nx-item visible" (tap)="tapWrapper($event)">
            <StackLayout col="0" class="icon-column" style="vertical-align:center;horizontal-align:center" >
                <ng-content select="[item-left]"></ng-content>
            </StackLayout>
            <StackLayout col="1">
                <ng-content></ng-content>
            </StackLayout>
            <StackLayout col="2" class="icon-column" style="vertical-align:center;horizontal-align:center">
                <ng-content select="[item-right]"></ng-content>
            </StackLayout>
        </GridLayout>
    </StackLayout>
    `,
    providers: [],
    inputs: ['params: nxRoute'],
    outputs: ["tap"]
})
export class NxListItem {
    private template: TemplateRef;
    private container: ElementRef;
    
    @ViewChild('item') 
    set _setListElement(item: ElementRef){
        this.container = item;
        this.itemReady.next(this);
    }
        
    constructor(
        private router: Router, 
        private logger:Logger){
    }
       
    private routeParams: any[];
    // the instruction passed to the router to navigate
    private navigationInstruction: Instruction;
    
    set params(changes: any[]) {
        this.routeParams = changes;
        this.navigationInstruction = this.router.generate(this.routeParams);
        
        //this.logger.Notify("route params:");
        //this.logger.NotifyObject(changes);
    }
    
    get isRouteActive(): boolean 
    { 
        let available = this.navigationInstruction; 
        if(!available){
            //this.logger.Notify("no route specified."); 
            return false;
        }
        //this.logger.Notify("route parts:");
        this.logger.NotifyArray(this.routeParams);
        //this.logger.Notify("current instruction");
        //this.logger.Notify(this.router.currentInstruction.toStr);
        
        let active = this.router.isRouteActive(this.navigationInstruction);
            

        //this.logger.Notify("test route - active: " + active);
        
        return active;
    }
    
    public itemReady: Subject<NxListItem> = new Subject<NxListItem>();
    public itemSelected: Subject<NxListItem> = new Subject<NxListItem>();
    
    public itemLoading($event)
    {
        //this.logger.Notify("item loading");
    }
    
    public itemLoaded($event)
    {
        //this.logger.Notify("item loaded");
    }
    
    public getNativeElement() : StackLayout {
        if(!this.container){ return ; }
        
        let stackLayout: StackLayout = this.container.nativeElement;
        
        return stackLayout;
    }
    
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on item");
        
        var stackLayout: StackLayout = this.getNativeElement();
        if(!stackLayout) { return ;}
        
        this.itemSelected.next(this);
         
        let moveRight = stackLayout.animate({
            duration: 100,
            translate: { x: 20, y: 0 },
            opacity: 0.8
        }).then(() =>{
            return stackLayout.animate({ 
                duration: 100,
                translate: { x:0, y: 0},
                opacity: 1
            });
        }).then(() => {
            if(this.navigationInstruction){
                this.logger.Notify("try to navigate!");
                this.logger.NotifyObject(this.navigationInstruction);
                
                //this.router.navigate(this.routeParams);
                this.router.navigateByInstruction(this.navigationInstruction)
                .then(() => {
                    this.logger.Notify("navigated from competitions - > competition");
                }).catch((r) => {
                    this.logger.Error("navigation rejected");
                    this.logger.NotifyObject(r);
                });;
            }else if(this.tap){
                this.tap.next(args);
            } else {
                this.logger.Notify("tap has not been set on the view");
            }
        });
    };
    
    public tap = new EventEmitter(); // : (args: EventEmitter<any>) => void;
    //todo get the contents to naviate
}