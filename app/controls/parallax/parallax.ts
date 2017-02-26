import { Component, QueryList, ViewChild,ViewChildren, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } 
from "@angular/core";
import { Logger } from "../../providers/logger";
import { Page } from "ui/page";
import { StackLayout} from 'ui/layouts/stack-layout';
import { ScrollView, ScrollEventData } from 'ui/scroll-view';
import { ContentView } from "ui/content-view";
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Directive({
    selector: "[parallax-hide]",
})
export class ParallaxCollapsableItem{
    constructor(public element: ElementRef){
    }
}

@Directive({
    selector : "[parallax-show]"
})
export class ParallaxExpandableItem{
    constructor(public element: ElementRef){
    }
}

/* todo - convert to table and float header above content */
// original by https://github.com/TheOriginalJosh I've taken out the find by ids and added directives
@Component({
    selector: "nx-parallax",
    template:`
        <GridLayout >
            <ScrollView #scrollView>
                <GridLayout>
                    <StackLayout #body horizontalAlignment="stretch" style="margin-top:200">
                        <ng-content></ng-content>
                    </StackLayout>  
                </GridLayout>
            </ScrollView>
            
            <AbsoluteLayout verticalAlignment="top" horizontalAlignment="left">
                <StackLayout #header top="0" left="0" height="200" style="background-color:#FFFFFF">
                    <ng-content select="[header]"></ng-content>
                </StackLayout>
            </AbsoluteLayout>  
            
            <StackLayout #pinned top="0" left="0">
                <ng-content select="[pinned]"></ng-content>
            </StackLayout> 
        </GridLayout>
    `
})
export class Paralax {
    
    private scrollViewAvailable: Subject<ElementRef>;
    private headerAvailable : Subject<ElementRef>;
    private bodyAvailable : Subject<ElementRef>;
    private pinnedAvailable: Subject<ElementRef>;
    
    private actions : Observable<{ 
        scrollView: ElementRef, 
        header: ElementRef,
        body: ElementRef, 
        pinned: ElementRef 
        }>;
    
    constructor(private logger: Logger) 
    {        
        this.scrollViewAvailable = new Subject<ElementRef>();
        this.headerAvailable = new Subject<ElementRef>();
        this.bodyAvailable = new Subject<ElementRef>();
        this.pinnedAvailable = new Subject<ElementRef>();
        
        this.headerHeight = 200;
        this.minHeaderHeight = 50;
        this.actions = Observable.zip(this.scrollViewAvailable,
            this.headerAvailable, 
            this.bodyAvailable,
            this.pinnedAvailable, 
            (scrollViewRef :ElementRef,headerRef: ElementRef, bodyRef: ElementRef, pinnedRef: ElementRef) =>
            {
                let headerElement : ScrollView = headerRef.nativeElement
                headerElement.height = this.headerHeight;
                return {
                    scrollView: scrollViewRef,
                    header: headerRef,
                    body: bodyRef,
                    pinned: pinnedRef
                };
            });
                
        this.actions.subscribe(values => {
            this.EvaluateScroll(values.scrollView, values.header, values.body, values.pinned);
        });
    }
    
    @Input('header-height') 
    public headerHeight: number;
	@Input('header-min-height') 
    public minHeaderHeight: number;
    
    private scrollView : ElementRef;
    @ViewChild('scrollView') 
    set _setScrollView(item: ElementRef){
        this.scrollView = item;
        this.scrollViewAvailable.next(item);
    }
     
    private headerView : ElementRef;
    @ViewChild('header')
    set _setHeaderView(item: ElementRef){
        this.headerView = item;
        this.headerAvailable.next(item);
    }
    
    private pinnedView :ElementRef; 
    @ViewChild('pinned')
    set _setPinnedView(item: ElementRef){
        this.pinnedView = item;
        this.pinnedAvailable.next(item);
    }
    
    private bodyView : ElementRef; 
    @ViewChild('body')
    set _setBodyView(item: ElementRef){
        this.bodyView = item;
        this.bodyAvailable.next(item);
    }

    @ContentChildren(ParallaxCollapsableItem)
    __collapseItems : QueryList<ParallaxCollapsableItem>;
    
    @ContentChildren(ParallaxExpandableItem)
    __expandItems : QueryList<ParallaxCollapsableItem>;
    
    private topOpactity : number = 1;
    
    private FadeItems(){
        let scrollView = this.scrollView.nativeElement;
        
        let topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
        
        if (topOpacity > 0 && topOpacity <= 1) {
            
            let controlsToFadeOut = this.__collapseItems.toArray();   
            //fade each control
            controlsToFadeOut.forEach((directiveItems) => {
                let view : ContentView = directiveItems.element.nativeElement;
                view.opacity = topOpacity;
            });
            //fade in each control 
            let controlsToFadeIn = this.__expandItems.toArray();

            controlsToFadeIn.forEach((directiveItem) => {
                let view : ContentView = directiveItem.element.nativeElement;
                view.opacity = -topOpacity;
            });
        }
    }
    
    private prevOffset : number = -10;
    
    private GrowEffect(){
        let newHeight = 0; 
        let scrollView = this.scrollView.nativeElement;
        let header = this.headerView.nativeElement;
        let body = this.bodyView.nativeElement;
        
        if (this.prevOffset <= scrollView.verticalOffset) {
            //scroll down
            newHeight = this.getTopViewHeight(this.headerHeight, scrollView.verticalOffset);
        } else {
            //scroll up
            if (header.height <= this.headerHeight) {
                newHeight = this.getTopViewHeight(this.headerHeight, scrollView.verticalOffset);
            }
        }
        
        let changeHeight = newHeight > this.minHeaderHeight;
        header.height = changeHeight ? newHeight : this.minHeaderHeight;
        
        this.prevOffset = scrollView.verticalOffset;
        body.marginTop = header.height;
    }
    
    private EvaluateScroll(scrollViewRef: ElementRef, headerRef : ElementRef, bodyRef: ElementRef, pinnedRef: ElementRef){
        let scrollView :ScrollView = scrollViewRef.nativeElement;

		scrollView.on(ScrollView.scrollEvent, (args: ScrollEventData) => {
            let header : StackLayout = headerRef.nativeElement;
            let body : StackLayout = bodyRef.nativeElement;
            let pinned : StackLayout = pinnedRef.nativeElement;
                    
            this.GrowEffect();
			this.FadeItems();
		});
    }
        
	getTopViewHeight(topHeight: number, offset: number): number {
		if ((topHeight - offset) >= 0) {
			return topHeight - offset;
		} else {
			return 0;
		}
	}
}