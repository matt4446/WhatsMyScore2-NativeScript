import { Control } from "../../decorators/control";
import { QueryList, ViewChild,ViewChildren, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { Page } from "ui/page";
import { StackLayout} from 'ui/layouts/stack-layout';
import { ScrollView, ScrollEventData } from 'ui/scroll-view';
import { ContentView } from "ui/content-view";

//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Directive({
    selector: "[collapse-parallax]",
})
export class ParallaxCollapsableItem{
    constructor(public element: ElementRef){
    }
}

/* todo - convert to table and float header above content */

@Control({
    selector: "nx-parallax",
    template:`
        <ScrollView #scrollView>
            <StackLayout>
                <StackLayout #header>
                    <ng-content select="[header]"></ng-content>
                </StackLayout>
                <StackLayout #body>
                    <ng-content></ng-content>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    `,
    directives : [ParallaxCollapsableItem]
})
export class Paralax {
    
    private scrollViewAvailable: Subject<ElementRef>;
    private headerAvailable : Subject<ElementRef>;
    private bodyAvailable : Subject<ElementRef>;
    private actions : Observable<{ scrollView: ElementRef, header: ElementRef, body: ElementRef }>;
    
    constructor(private logger: Logger) 
    {        
        this.scrollViewAvailable = new Subject<ElementRef>();
        this.headerAvailable = new Subject<ElementRef>();
        this.bodyAvailable = new Subject<ElementRef>();
        this.headerHeight = 200;
        this.minHeaderHeight = 50;
        
        this.actions = Observable.zip(this.scrollViewAvailable,
            this.headerAvailable, 
            this.bodyAvailable, (scrollViewRef :ElementRef,headerRef: ElementRef, bodyRef: ElementRef)=>
            {
                let headerElement : ScrollView = headerRef.nativeElement
                headerElement.height = this.headerHeight;
                return {
                    scrollView: scrollViewRef,
                    header: headerRef,
                    body: bodyRef
                };
            });
                
        this.actions.subscribe(values => {
            this.EvaluateScroll(values.scrollView, values.header, values.body);
        });
    }
    
    @Input('header-height') public headerHeight: number;
	@Input('header-min-height') public minHeaderHeight: number;
    
    @ViewChild('scrollView') 
    set _scrollView(item: ElementRef){
        this.scrollViewAvailable.next(item);
    }
        
    @ViewChild('header')
    set _setHeaderView(item: ElementRef){
        this.headerAvailable.next(item);
        
    }
    
    @ViewChild('body')
    set _setBodyView(item: ElementRef){
        this.bodyAvailable.next(item);
    }
    
    @ViewChildren(ParallaxCollapsableItem)
    __collapseItems : QueryList<ParallaxCollapsableItem>
      
    @ContentChildren(ParallaxCollapsableItem)
    __collapseItems2 : QueryList<ParallaxCollapsableItem>
      
      
    private EvaluateScroll(scrollViewRef: ElementRef, headerRef : ElementRef, bodyRef: ElementRef){
        let prevOffset = -10;
		let topOpacity = 1;

        let scrollView = scrollViewRef.nativeElement;

		scrollView.on(ScrollView.scrollEvent, (args: ScrollEventData) => {
            let header : StackLayout = headerRef.nativeElement;
            let body : StackLayout = bodyRef.nativeElement;
            
            this.logger.Notify("scrolling");
            this.logger.Notify("header height: "+ header.height);
            let shrink = prevOffset <= scrollView.verticalOffset; 
			if (shrink) {
				if (header.height >= this.minHeaderHeight) {
					header.height = this.getTopViewHeight(this.headerHeight, scrollView.verticalOffset);
				}
			} else {
                
				if (header.height <= this.headerHeight) {
					header.height = this.getTopViewHeight(this.headerHeight, scrollView.verticalOffset);
				}
			}
			//fades in and out label in topView
			if (scrollView.verticalOffset < this.headerHeight) {
				topOpacity = parseFloat((1 - (scrollView.verticalOffset * 0.01)).toString());
				if (topOpacity > 0 && topOpacity <= 1) {
                    
                    //this.logger.NotifyObject(this.__collapseItems2);

                    let controlsToFade = this.__collapseItems2.toArray();   
                    this.logger.Notify("controls to fade: " + controlsToFade.length);
					//fade each control
					controlsToFade.forEach((directiveItems) => {
                        let view : ContentView = directiveItems.element.nativeElement;
						view.opacity = topOpacity;
					});
				}
			}
			prevOffset = scrollView.verticalOffset;
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