import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui"

@Control({
    selector:"nx-item",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    //https://github.com/NativeScript/NativeScript/issues/859 -- cant get per side border yet. 
    template: `
    <Border height="2" borderRadius="0" borderWidth="2" borderColor="#387ef5"></Border>
    <GridLayout columns="32, *, 32" rows="auto" class="nx-item">
        <StackLayout col="0" class="icon-column" style="vertical-align:center;horizontal-align:center" >
            <ng-content select="[item-left]"></ng-content>
        </StackLayout>
        <StackLayout col="1">
            <ng-content></ng-content>
        </StackLayout>
        <StackLayout col="2" lass="icon-column" style="vertical-align:center;horizontal-align:center">
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
    
    //todo get the contents to naviate
}