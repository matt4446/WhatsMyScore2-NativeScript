import { Control } from "../../decorators/control";
import { Directive, PipeTransform, Pipe, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";

@Directive({
    selector:"nav-icon",
    properties: [
        'class: ion-icon nav-icon' 
    ]
})
export class NavIcon{ }

@Control({
    selector:"ion-icon",
    // template: `   
    // <label (tap)="tapIcon" #item 
    //     class="ion-icon"
    //     [style.color]="color"        <-- ORIGINAL EXCEPTION: Error: Not implemented: setStyleProperty
    //     [text]="GetIcon()"></label>
    // `, 
    template: `   
    <label (tap)="tapIcon" #item 
        class="ion-icon"
        [text]="GetIcon()"></label>
    `, 
    providers: [],
    inputs:["icon", "nav"],
    outputs:["tap"]
    //pipes: [IconPipe]
})
export class IonIcon {

    constructor(private logger:Logger){
        this.logger.Notify("icon added");
    }
        
    public GetIcon(): string
    {
        let key = this.icon ? this.icon : "";
        key = this.Match(this.icon);    

        return key;
    }
    
    public color = "#FF0000";
    public icon : string;
    public nav : boolean = false;
    public tap = new EventEmitter();
    
    //http://ionicons.com/cheatsheet.html
    private Match(key: string){
        switch (key) {
            case "ion-alert":
                return "\uf101"
            case "ion-alert-circled":
                return "\uf100";
            case "ion-android-add":
                return "\uf2c7";
            case "ion-android-add-circle":
                return "\uf359";
            case "ion-ios-star":
                return "\uf4b3";
            // .. 
            case "ion-ios-people" : 
                return "\uf47c";
            case "ion-map" : 
                return "\uf203";
            case "ion-search" : 
                return "\uf21f";
            case "ion-chevron-left": 
                return "\uf124"; 
            case "ion-chevron-right":
                return "\uf125";
            case "ion-clipboard": 
                return "\uf127";
            case "ion-android-favorite":
                return "\uf388";
            case "ion-android-menu":
                return "\uf394";
            default: 
                //ion-alert
                return key;
        }
    }
}