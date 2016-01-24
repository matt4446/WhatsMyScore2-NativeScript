import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren, ViewChild } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui"

@Control({
    selector:"nx-header",
    template: `
    <StackLayout>
        <label cssClass='nx-header' text='hi' cssClass='nx-header'></label>
    </StackLayout>
    `,
    providers: []
})
export class NxHeader
{
    constructor(private logger: Logger){
        this.logger.Notify("add header");
    }
}