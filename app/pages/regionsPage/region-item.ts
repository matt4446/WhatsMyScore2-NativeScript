
import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren, ViewChild } from "angular2/core";
import { Logger } from "../../providers/logger";
import { StackLayout, Button } from "ui";
import { IProvider } from "../../models/models";

@Control({
    selector:"region-item",
    template: `
    <button [text]=''></button>
    `,
    providers: [],
    host:{
        "class" : "item"
    },
    inputs: ["Item"]
})
export class RegionItem {
    constructor(private logger:Logger){
        this.logger.Notify("region-item added");
    }

    public Item : IProvider;
}