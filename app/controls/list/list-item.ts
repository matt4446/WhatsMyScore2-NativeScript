import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren, ViewChild } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui"

@Control({
    selector:"nx-list-item",
    template: `
    <StackLayout>
        <label text="list item added"></label>
        <ng-content></ng-content>
    </StackLayout>
    `,
    providers: [],
    host:{
        "class" : "item"
    }
})
export class NxListItem {
    constructor(private logger:Logger){
        this.logger.Notify("nx-item added");
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