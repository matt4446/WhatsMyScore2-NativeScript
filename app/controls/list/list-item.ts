import { Control } from "../../decorators/control";
import { ElementRef, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button, Page } from "ui"


@Control({
    selector:"nx-item",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    //https://github.com/NativeScript/NativeScript/issues/859 -- cant get per side border yet. 
    template: `
    <StackLayout #item>
    <Border height="2" borderRadius="0" borderWidth="2" borderColor="#387ef5"></Border>
    <GridLayout  columns="32, *, 32" rows="auto" class="nx-item" (tap)="tapWrapper($event)">
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
    
    @ViewChild('item') private container: ElementRef

    constructor(private logger:Logger){
        this.logger.Notify("nx-item added");
    }
    
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on item");
        console.log('Container: ' + this.container);
        console.log('Container element: ' + this.container.nativeElement);
        console.log('Container page: ' + this.container.nativeElement.page);
        
        let stackLayout: StackLayout = this.container.nativeElement;
        let page = stackLayout.page;
        
        let moveRight = stackLayout.animate({
            duration: 200,
            translate: { x: 20, y: 0 },
            opacity: 0.8
        }).then(() =>{
            return stackLayout.animate({ 
                duration: 300,
                translate: { x:0, y: 0},
                opacity: 1
        });  
        }).then(() => {
            if(this.tap){
                this.tap.next(args);
            } else {
                this.logger.Notify("tap has not been set on the view");
            }
        })
            
        
        
    };
    
    public tap = new EventEmitter(); // : (args: EventEmitter<any>) => void;
    //todo get the contents to naviate
}