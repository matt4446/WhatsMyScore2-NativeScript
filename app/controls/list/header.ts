import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren, ViewChild } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui";

import { NxListItem } from "./list-item";

@Control({
    selector:"nx-header",
//     template: `
//     <StackLayout class="nx-header" style="background-color:#4d75b8;color:#ffffff;">
// 
//         <nx-item>
//             <ng-content></ng-content>
//         </nx-item>
// 
//     </StackLayout>
// 
//     `,
    template: `
    
        <StackLayout class="nx-header-outer">
            <StackLayout class="nx-header-inner">
                <ng-content></ng-content>
            </StackLayout>
        </StackLayout>

    `,
    providers: [],
    directives:[ NxListItem ]
})
export class NxHeader
{
    constructor(private logger: Logger){
        this.logger.Notify("add header");
    }
}

    // <StackLayout style="background-color:#4d75b8;color:#ffffff;">
    //     <StackLayout class="nx-header" style="padding:16">
    //         <ng-content></ng-content>
    //     </StackLayout>
    // </StackLayout>