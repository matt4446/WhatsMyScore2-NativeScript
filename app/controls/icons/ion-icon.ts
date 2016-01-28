import { Control } from "../../decorators/control";
import { PipeTransform, Pipe, Input, Output, EventEmitter, ContentChildren,ContentChild, ViewChild,TemplateRef } from "angular2/core";
import { Logger } from "../../providers/logger";

// @Pipe({name: 'IconPipe', pure: true})
// class IconPipe implements PipeTransform {
//    transform(value: any, args: any[] = []) {
//        console.log("icon-pipe");
//        console.log(value);
//        
//        let r = value.replace("&#x", "");
//        r = r.replace(";","");
// 
//        let k = "\\u" + r;
//        return k;
//    }
// }

@Control({
    selector:"ion-icon",
    /* Target:
    <label class="ion-icon" text="&#xf203;"></label>
    */
    /* <label class="ion-icon" [text]="test2 | IconPipe"></label>  */
    template: `   
    <label class="ion-icon" [text]="GetIcon()"></label>
    `,
    providers: [],
    inputs:["icon"],
    //pipes: [IconPipe]
})
export class IonIcon {
    private template: TemplateRef;
    
    constructor(private logger:Logger){
        this.logger.Notify("icon added");
    }
    
    public hi = "hi self";
    public test = "\uf101";
    public test2 = "&#xf101;";
    
    public GetIcon(): string
    {
        let key = this.icon ? this.icon : "";
        key = this.Match(this.icon);    

        return key;
    }
    
    public icon : string;
    
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
            default: 
                //ion-alert
                return key;
        }
    }
}