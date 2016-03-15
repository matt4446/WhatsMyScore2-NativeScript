import { Control } from "../../decorators/control";
import { ElementRef, Input, Output, EventEmitter, ContentChildren, ViewChild } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui";

import { NxListItem } from "./list-item";

@Control({
    selector:"nx-header",
    template: `
        <StackLayout #item class="nx-header">
            <ng-content></ng-content>
        </StackLayout>
        <Border borderWidth="2" class="nx-header-ext" style="margin-top:-4">
        </Border>
        
    `,
    providers: [],
    directives:[ NxListItem ]
})
export class NxHeader
{
    private container: ElementRef;
    
    constructor(private logger: Logger){
        this.logger.Notify("add header");
    }
    
    @ViewChild('item') 
    set _setHeaderElement(item: ElementRef){
        this.container = item;
    }
    
    public getNativeElement() : StackLayout {
        if(!this.container){ return ; }
        
        let stackLayout: StackLayout = this.container.nativeElement;
        
        return stackLayout;
    }
}

    // <StackLayout style="background-color:#4d75b8;color:#ffffff;">
    //     <StackLayout class="nx-header" style="padding:16">
    //         <ng-content></ng-content>
    //     </StackLayout>
    // </StackLayout>