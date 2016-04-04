import { Control } from "../../decorators/control";
import { EmbeddedViewRef, EventEmitter, ContentChildren, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';
import { Logger} from "../../providers/logger";
import { NxNav } from "../nav/nav";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { StackLayout,AbsoluteLayout, GridLayout, Button, Page, Frame } from "ui";

/*
 * GridLayout without rows and columns defined will overlap elements. 
 */

@Control({
    selector:"nx-drawer",
    template:`
        <GridLayout>
            <AbsoluteLayout #asideLeftParent opacity="0" verticalAlignment="top" horizontalAlignment="left">
                <StackLayout top="0" left="0" width="300" #asideLeft>
                    <ng-content select="[drawer-aside-left]"></ng-content>
                </StackLayout>
            </AbsoluteLayout>  
        
            <StackLayout #grid horizontalAlignment="stretch">
                
                <StackLayout #centerContent >
                    <ng-content></ng-content>
                </StackLayout>

            </StackLayout>  
        </GridLayout>
    `
})
export class NxDrawer {
    private childNavs : Array<NxNav>;
    private asideLeftContent : ElementRef;
    private asideRightContent: ElementRef;
    private centerContent: ElementRef;
    
    public constructor(private logger: Logger ){
        this.logger.Notify("nx-drawer");
    }
    
    private State = {
        Open : false,
        HasLeft : false,
        HasRight: false,
        NavAttached: false
    };
    
    public Open () {
        if(this.State.Open){
            return;
        }
    }
    
    public Close() {
        if(!this.State.Open){
            return ;
        }
    }
    
    private ngOnInit(){
        //let center: StackLayout = this.centerContent.nativeElement;
    } 
    
    @ViewChild('grid')private grid: ElementRef;
    @ViewChild("asideLeftParent")private asideLeftParent: ElementRef;
    
    @ViewChild('asideLeft') 
    set _asideLeft(item: ElementRef){
        this.asideLeftContent = item;
        this.State.HasLeft = true;
        
        this.logger.Notify("drawer.asideLeftContent set" + item);
    }
    
    @ViewChild('asideRight') 
    set _asideRight(item: ElementRef){
        this.asideRightContent = item;
        this.State.HasRight = true;    
        this.logger.Notify("drawer.asideRightContent set: item" + item);
    }
    
    @ViewChild('centerContent')
    set _setCenter(item: ElementRef){
        this.centerContent = item;
    }
    
    @ContentChildren(NxNav)
    set _setNav(items: any){
        if(this.State.NavAttached){ return; }
        
        this.logger.Notify("drawer.nav set: " + items);
        this.State.NavAttached = true;
        this.childNavs = items.toArray();
        
        this.logger.Notify("nav items: " + this.childNavs.length);
        
        var anySelected = this.childNavs.map((item) => item.menuSelected);
                
        Observable.fromArray(anySelected).flatMap(x=> x).subscribe(() => { 
            this.logger.Notify("nav menu tapped -> open side");
            let grid: StackLayout = this.grid.nativeElement;
            
            let leftParent: AbsoluteLayout = this.asideLeftParent.nativeElement;
            let left: StackLayout = this.asideLeftContent.nativeElement;
            let right: StackLayout = this.asideLeftContent.nativeElement;
            let center: StackLayout = this.centerContent.nativeElement;
            
            if(this.State.Open){
                this.State.Open = false;
                this.logger.Notify("bring back center");
                //center.visibility = "collapse";
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
            }else if(!this.State.Open){
                this.State.Open = true;
                this.logger.Notify("show aside left");
                //center.visibility = "visible";
                center.animate({
                    translate: {
                        y: 0,
                        x: 300
                    },
                    opacity: 0.7
                });
                
                leftParent.animate({
                    opacity: 1
                });
            }
            
            
        });
    }
}