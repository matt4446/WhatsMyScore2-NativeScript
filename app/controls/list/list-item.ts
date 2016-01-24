import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui"

@Control({
    selector:"nx-list-item",
    template: `
    
    <GridLayout columns="auto, auto, auto" 
        rows="auto" cssClass='nx-item' >
        <StackLayout col="0">
            <ng-content select="[item-left]"></ng-content>
        </StackLayout>
        <StackLayout col="1">
            <ng-content></ng-content>
        </StackLayout>
        <StackLayout col="2">
            <ng-content select="[item-right]"></ng-content>
        </StackLayout>
    </GridLayout>
    `,
    providers: []
})
export class NxListItem {
    private template: TemplateRef;
    
    constructor(private logger:Logger){
        this.logger.Notify("nx-item added");
    }
    
    @ContentChild(TemplateRef) 
    set Child(template: TemplateRef){
        this.logger.Notify("Tempalte");
        let stackLayout: StackLayout = template.elementRef.nativeElement;
        
        stackLayout.animate({
            translate: {
                x : 10,
                y : 0
            }
        });
    }

    @ViewChild(StackLayout)
    set Element(stackItem : StackLayout) {
        
        if(stackItem == null){
            this.logger.Notify("SET:StackLayout is unavailable");
            return;   
        }
        
        this.logger.Notify("SET:StackLayout is available");
        debugger;
        stackItem.animate({
            translate: {
                x : 10,
                y : 0
            }
        })
    }
    //not running yet. Shame
    // 
    // @ContentChildren(Button)
    // set _buttons(buttons){
    //     this.logger.Notify("Setting button as list content");
    //     buttons.toArray().forEach((button: Button) => {
    //         button.className += ' item-button';
    //         button.style.opacity = 0;
    //          
    //          button.animate({
    //              opacity: 1,
    //              duration: 3000
    //          });
    //     });
    // }
}