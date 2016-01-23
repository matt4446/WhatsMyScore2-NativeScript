import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { Button } from "ui/button";
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
    
    //not running yet. Shame
    
    @ContentChildren(Button)
    set _buttons(buttons){
        this.logger.Notify("Setting button as list content");
        buttons.toArray().forEach((button: Button) => {
            button.className += ' item-button';
            button.style.opacity = 0;
             
             button.animate({
                 opacity: 1,
                 duration: 3000
             });
        });
    }
}