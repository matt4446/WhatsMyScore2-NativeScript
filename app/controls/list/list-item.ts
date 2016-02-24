import { Control } from "../../decorators/control";
import { HostListener, ElementRef, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button, Page } from "ui"
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Control({
    selector:"nx-item",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    //https://github.com/NativeScript/NativeScript/issues/859 -- cant get per side border yet. 
    template: `
    <StackLayout #item style="opacity:1">
        <Border height="2" borderRadius="0" borderWidth="1" borderColor="#387ef5"></Border>
        <GridLayout  columns="42, *, 42" rows="auto" class="nx-item" (tap)="tapWrapper($event)">
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
    outputs: ["tap"]
})
export class NxListItem {
    private template: TemplateRef;
    private container: ElementRef;
    
    @ViewChild('item') 
    set _listItems(item: ElementRef){
        this.container = item;
        this.itemReady.next(this);
    }
        
    constructor(private logger:Logger){
        this.logger.Notify("nx-item added");
        this.itemReady.subscribe(() => {
            this.logger.Notify("nx-item ready");
        });
        this.itemSelected.subscribe(() => {
           this.logger.Notify("nx-item selected");
        });
    }
    
    public itemReady: Subject<NxListItem> = new Subject<NxListItem>();
    public itemSelected: Subject<NxListItem> = new Subject<NxListItem>();
    
    public itemLoading($event)
    {
        this.logger.Notify("item loading");
    }
    
    public itemLoaded($event)
    {
        this.logger.Notify("item loaded");
    }
    
    public getNativeElement() : StackLayout {
        let stackLayout: StackLayout = this.container.nativeElement;
        
        return stackLayout;
    }
    
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on item");
        
        var stackLayout: StackLayout = this.getNativeElement();
        
        this.logger.NotifyObjectProperties(stackLayout);
        this.itemSelected.next(this);
        
        //this.tap.next(args);        
        //.. working cli 1.6 :)  
         
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
            if(this.tap){
                this.tap.next(args);
            } else {
                this.logger.Notify("tap has not been set on the view");
            }
            
              
        });
        
        

    };
    
    public tap = new EventEmitter(); // : (args: EventEmitter<any>) => void;
    //todo get the contents to naviate
}