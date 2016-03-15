import { Control } from "../../decorators/control";
import { Directive, HostListener, ElementRef, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";
import { Label } from "ui";

@Directive({
    selector:"nav-icon",
    properties: [
        'class: ion-icon nav-icon' 
    ]
})
export class NavIcon
{
    
}

@Control({
    selector:"ion-icon",
    // template: `   
    // <label (tap)="tapIcon" #item 
    //     class="ion-icon"
    //     [style.color]="color"        <-- ORIGINAL EXCEPTION: Error: Not implemented: setStyleProperty
    //     [text]="GetIcon()"></label>
    // `, 
    template: `   
    <label (tap)="tapIcon($event)" #item 
        class="ion-icon"
        [text]="GetIcon()"></label>
    `, 
    providers: [],
    inputs:["icon", "nav"],
    outputs:["tap"]
    //pipes: [IconPipe]
})
export class IonIcon {
    private container: ElementRef;
    
    constructor(private logger:Logger){
        this.logger.Notify("icon added");
    }
    
    @ViewChild('item') 
    set _listItems(item: ElementRef){
        this.container = item;
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
    
    public tapIcon($event){
        this.logger.Notify("icon tapped");
        let label : Label = this.container.nativeElement;
        label.animate({
            opacity: 0.7
        }).then(() => {
            return label.animate({
                opacity: 1
            });
        });
        this.tap.next($event)
    }
    
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
            case "ion-calendar":
                return "\uf117";
            // .. 
            
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
                
            /*
                ios 
             */
            case "ion-ios-star":
                return "\uf4b3";
            case "ion-ios-people" : 
                return "\uf47c";
            
            default: 
                //ion-alert
                return key;
        }
    }
}