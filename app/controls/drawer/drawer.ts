import { EmbeddedViewRef, EventEmitter, ContentChildren, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from '@angular/core';

import { Control } from "../../decorators/control";
import { Logger} from "../../providers/logger";
import { NxNav } from "../nav/nav";
import * as Rx from 'rxjs/Rx';
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { StackLayout } from "ui/layouts/stack-layout";
import { GridLayout } from "ui/layouts/grid-layout";  
import { Button } from "ui/button";
import { PanGestureEventData} from "ui/gestures";
import { AnimationPromise } from "ui/animation";// animation = require("ui/animation");
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/from';

/*
 * GridLayout without rows and columns defined will overlap elements. 
 */

@Directive({
    selector : "[nx-drawer-close]"
})
export class NxCloseDrawer
{

} 

@Control({
    selector:"nx-drawer",
    template:`
    
        <GridLayout rows="*" columns="*">
            
   

        
            
        
            <StackLayout #grid row="0" col="0">
                <StackLayout #centerContent>
                    <ng-content></ng-content>
                </StackLayout>
            </StackLayout> 
            <!-- need the AbsoluteLayout as it gets confused for some reason  --> 
            <AbsoluteLayout>
                <StackLayout horizontalAlignment="left" #asideLeftParent opacity="0" width="300">
                    <StackLayout  #asideLeft>
                        <ng-content select="[drawer-aside-left]"></ng-content>
                    </StackLayout>
                </StackLayout> 
            </AbsoluteLayout>
             
        </GridLayout>

    `
})
export class NxDrawer {
    private childNavs : Array<NxNav>;
    private asideLeftContent : ElementRef;
    private asideRightContent: ElementRef;
    private centerContent: ElementRef;
    
    public constructor(private logger: Logger ){
        //this.logger.Notify("nx-drawer");
    }
    
    private State = {
        Open : false,
        HasLeft : false,
        HasRight: false,
        NavAttached: false
    };
    
    public OpenLeftAside() {
        // if(this.State.Open){
        //     return;
        // }
        this.State.Open = true;
        let center: StackLayout = this.centerContent.nativeElement;
        let leftParent: AbsoluteLayout = this.asideLeftParent.nativeElement;
        this.logger.Notify("bring back center");
        //center.visibility = "collapse";
        
        center.animate({
            translate: {
                y: 0,
                x: 300
            },
            opacity: 0.7
        });
        
        leftParent.animate({
            opacity: 1,
            translate: {
                x: 0,
                y: 0
            }
        });
        
    }
    
    public CloseLeftAside() {
        if(!this.State.Open){
            return ;
        }
        this.State.Open = false;
        let center: StackLayout = this.centerContent.nativeElement;
        let leftParent: AbsoluteLayout = this.asideLeftParent.nativeElement;
        this.logger.Notify("show aside left");
                //center.visibility = "visible";
        center.animate({
            translate: {
                y: 0,
                x: 0
            },
            opacity : 1
        });
        
        leftParent.animate({
            opacity: 0
        });

    }

    public AnimateCenterToPosition(x : number){
        let center: StackLayout = this.centerContent.nativeElement;
        let leftParent: AbsoluteLayout = this.asideLeftParent.nativeElement;
        
        if(x > 0){
            center.translateX = 300;
            leftParent.translateX = 0;
            return;
        }

        var newPosition = -((x /100) * 300) * 0.8;
        var newOpacity = (Math.abs(x)/100) * 1; 

        //go a little over 
        newPosition = newPosition > 400 ? 400 : newPosition;
        newOpacity = newOpacity > 1 
            ? 1 
            : newOpacity < 0.2 ? 0.2 : newOpacity;

        center.translateX = 300 - newPosition;
        center.opacity =  newOpacity;

        leftParent.translateX = -newPosition;
    }
    
    public mainTapped(){
        //if(!this.State.Open){ return ; }
        this.logger.Notify("main tapped");   
    }

    private ngOnInit(){
        //let center: StackLayout = this.centerContent.nativeElement;
    } 


    @ViewChild('grid')
    set _grid(item: ElementRef){
        this.logger.Notify("set pan on grid");
        let g : GridLayout = item.nativeElement;
        // g.on("pan", (args: PanGestureEventData) => {
        //     this.logger.Notify("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
        // });

        var pan = Rx.Observable.fromEvent<PanGestureEventData>(g, "pan");
        pan.filter(e=> e.state === 2).subscribe((args) => {
            this.logger.Notify("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
            this.AnimateCenterToPosition(args.deltaX);
        });
        pan.filter(e=> e.state === 3).subscribe((args)=> {
            if(args.deltaX < -100){
                this.logger.Notify("close");
                this.CloseLeftAside();
            }else{
                this.OpenLeftAside();
            }
        });
    }
    
    @ViewChild("asideLeftParent")private asideLeftParent: ElementRef;
    
    @ViewChild('asideLeft') 
    set _asideLeft(item: ElementRef){
        this.asideLeftContent = item;
        this.State.HasLeft = true;

        // this.logger.Notify("set pan on asideLeft");
        // let g : GridLayout = item.nativeElement;
        // g.on("pan", (args: PanGestureEventData) => {
        //     this.logger.Notify("Pan asideLeft delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
        // });
    }
    
    @ViewChild('asideRight') 
    set _asideRight(item: ElementRef){
        this.asideRightContent = item;
        this.State.HasRight = true;    
        //this.logger.Notify("drawer.asideRightContent set: item" + item);
    }
    
    @ViewChild('centerContent')
    set _setCenter(item: ElementRef){
        this.centerContent = item;
        // this.logger.Notify("set pan on centerContent");
        // let g : GridLayout = item.nativeElement;
        // g.on("pan", (args: PanGestureEventData) => {
        //     this.logger.Notify("Pan centerContent delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
        // });
    }
        
    @ContentChildren(NxNav)
    set _setNav(items: any){
        if(this.State.NavAttached){ return; }
        
        ///this.logger.Notify("drawer.nav set: " + items);
        this.State.NavAttached = true;
        this.childNavs = items.toArray();
        
        //this.logger.Notify("nav items: " + this.childNavs.length);
        
        var anySelected = this.childNavs.map((item) => item.menuSelected);
                
        Rx.Observable.from(anySelected).flatMap(x=>x).subscribe(() => { 
            this.logger.Notify("nav menu tapped -> open side");
            //let grid: StackLayout = this.grid.nativeElement;

            if(this.State.Open){ this.CloseLeftAside(); }
            else{ this.OpenLeftAside(); }

        });
    }
}