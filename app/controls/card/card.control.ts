import { Component, ElementRef, ViewChild } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs/Rx";

import { CardView } from "nativescript-cardview";
import { Logger } from "../../providers/logger";
import { registerElement } from "nativescript-angular/element-registry";

registerElement("CardView", () => {
    console.log("Adding CardView");
    return require("nativescript-cardview").CardView;
});
@Component({
    selector: "nx-card",
    template:`
    <CardView #item shadowColor="#FE00FC" elevation="10" margin="10">
        <Label text="cardview" textWrap="true"></Label>
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
    </CardView>
    `
})
export class NxCard {
    @ViewChild("item")
    set _listItems(item: ElementRef){
        let cardView: any = item.nativeElement;
    }
}