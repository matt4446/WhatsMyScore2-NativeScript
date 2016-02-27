import { Control } from "../../decorators/control";
import { EmbeddedViewRef, EventEmitter, ContentChildren, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';
import { Logger} from "../../providers/logger";
import { NxNav } from "../nav/nav";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { StackLayout,AbsoluteLayout, GridLayout, Button, Page, Frame } from "ui"

@Control({
    selector:"nx-drawer",
    template:`
        <GridLayout>
            <AbsoluteLayout #asideLeftParent opacity="0" verticalAlignment="top" horizontalAlignment="left">
                <StackLayout top="0" left="0" width="200" #asideLeft class="sidebar">
                    <ng-content select="[drawer-aside-left]"></ng-content>
                </StackLayout>
            </AbsoluteLayout>  
        
            <StackLayout #grid horizontalAlignment="stretch">
                
                <StackLayout top="0" left="0" #centerContent >
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
        Open : false
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
    }
    
    @ViewChild('asideRight') 
    set _asideRight(item: ElementRef){
        this.asideRightContent = item;
        
    }
    
    @ViewChild('centerContent')
    set _setCenter(item: ElementRef){
        this.centerContent = item;
    }
    
    @ContentChildren(NxNav)
    set _setNav(items: any){
        this.childNavs = items.toArray();
        
        var anySelected = this.childNavs.map((item) => item.menuSelected);
                
        Observable.fromArray(anySelected).flatMap(x=> x).subscribe(() => { 
            let grid: StackLayout = this.grid.nativeElement;
            
            let leftParent: AbsoluteLayout = this.asideLeftParent.nativeElement;
            let left: StackLayout = this.asideLeftContent.nativeElement;
            let right: StackLayout = this.asideLeftContent.nativeElement;
            let center: StackLayout = this.centerContent.nativeElement;
            
            if(this.State.Open){
                this.State.Open = false;
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
                //center.visibility = "visible";
                center.animate({
                    translate: {
                        y: 0,
                        x: 200
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