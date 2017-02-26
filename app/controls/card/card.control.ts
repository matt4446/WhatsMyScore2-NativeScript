import { Component, ViewChild, ElementRef } from "@angular/core";
import { Logger } from "../../providers/logger";
import { CardView } from "cardview";
import { registerElement } from "nativescript-angular/element-registry";
import { Observable, Subscription, Subject} from 'rxjs/Rx';

//import { Color } from "color";

registerElement("CardView", () => {
    console.log("Adding CardView");
    return require("nativescript-cardview").CardView;
});
@Component({
    selector: "nx-card",
    //templateUrl: "controls/list/list.html",
    template:`
    <CardView #item shadowColor="#FE00FC" elevation="10" margin="10">
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
    </CardView>
    `
})
export class NxCard {
    constructor() 
    {
    }
    
    @ViewChild('item') 
    set _listItems(item: ElementRef){
        let cardView: any = item.nativeElement;
        //cardView.shadowColor = new Color("#FF0000").android;
    }
}