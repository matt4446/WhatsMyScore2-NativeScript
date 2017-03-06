import {} from 'nativescript-angular/router';

import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { Button } from "ui/button";
import { Logger } from "../../providers/logger";
import {QueryList} from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router"
import { StackLayout } from "ui/layouts/stack-layout";

@Component({
    selector:"nx-item",
    
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    //https://github.com/NativeScript/NativeScript/issues/859 -- cant get per side border yet. 
    template: `
    <StackLayout #item>

        <StackLayout>
            <StackLayout class="nx-item-top-border"></StackLayout>

            <StackLayout class="nx-item inset-top inset-bottom">
                <GridLayout #animateItem columns="40, *, 50" rows="auto" (tap)="tapWrapper($event)">
                    <!-- default layout --> 
                    <StackLayout col="0" row="0" class="icon-column icon-left nx-item-column" >
                        <ng-content select="[item-left]"></ng-content>
                    </StackLayout>

                    <StackLayout col="1" row="0" class="nx-item-column">
                        <ng-content></ng-content>
                    </StackLayout>

                    <StackLayout col="2" row="0" class="icon-column icon-right nx-item-column">
                        <ng-content select="[item-right]"></ng-content>
                    </StackLayout>
                    
                    <!-- first two colums --> 
                    <StackLayout col="0" row="0" colSpan="2" class="nx-item-column inset-sides">
                        <ng-content select="[item-col-2-left]"></ng-content>
                    </StackLayout>

                    <!-- third column -->
                    <StackLayout col="1" row="0" colSpan="2" class="nx-item-column icon-column">
                        <ng-content select="[item-col-2-right]"></ng-content>
                    </StackLayout>

                    <!-- all three columns  -->
                    <StackLayout col="0" row="0" colSpan="3" class="nx-item-column inset-sides">
                        <ng-content select="[item-col-3]"></ng-content>
                    </StackLayout>
                    
                    <!-- highlight --> 
                    
                </GridLayout>
            </StackLayout>
        </StackLayout>
        

        

    </StackLayout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    outputs: ["tap"],
    styleUrls: ["./controls/list/list.common.css"]
})
export class NxListItem {
    //private template: TemplateRef;
    private container: ElementRef;
    
    @ViewChild('item') 
    set _setListElement(item: ElementRef){
        this.container = item;
        this.itemReady.next(this);
    }
    
    @ViewChild('animateItem')
    set _gridElement(item: ElementRef){
        let element:StackLayout = item.nativeElement ;
        
        if(this.Animate){
            element.className += " visible";
        }
    }

    @ContentChildren("NSRouterLink")
    __childRoute : QueryList<any>;

    @Input('nxRoute')
    private nxRoute: string;
    // the instruction passed to the router to navigate



    // set params(changes: string) {
    //     this.routeParams = changes;
    // }
            
    @Input('animate')
    public Animate : boolean; 
        
    constructor(private logger:Logger, private routerExtensions: RouterExtensions){
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
            
            this.logger.Notify("has nav:" + this.nxRoute);
            var a = this.__childRoute.toArray();
            if(a.length > 0){
                a[0].onTap();
            }

            if(this.nxRoute){
                this.logger.Notify("try to navigate!");
                this.logger.NotifyObject(this.nxRoute);
                
                
                this.routerExtensions.navigateByUrl(this.nxRoute)
                    .then(() => {
                        this.logger.Notify("navigated from competitions - > competition");
                    }).catch((r) => {
                        this.logger.Error("navigation rejected");
                        this.logger.Error(r.message);
                        this.logger.NotifyObject(r);
                    });
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