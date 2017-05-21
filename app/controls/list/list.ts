import { Component, ContentChildren, Directive, EventEmitter, Input, Output } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs/Rx";

import { AnimationCurve } from "ui/enums";
import { Logger } from "../../providers/logger";
import { NxHeader } from "./header";
import { NxListItem } from "./list-item";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";

@Component({
    moduleId: module.id,
    selector: "nx-list",
    styleUrls: ["list.common.css"],
    template:`
    <StackLayout class="nx-list">
        <StackLayout>
            <ng-content select="[item-top]"></ng-content>
        </StackLayout>
        <StackLayout>
            <ng-content></ng-content>
        </StackLayout>
        <StackLayout>
            <ng-content select="[item-bottom]"></ng-content>
        </StackLayout>
    </StackLayout>
    `
})
export class NxList {

    constructor(private logger: Logger) {
    }

    public padding : boolean = false;
    public children : Array<NxListItem>;
    public headers : Array<NxHeader>;

    @ContentChildren(NxHeader)
    set _setHeader(items : any) {
        this.headers = items.toArray();
    }

    @ContentChildren(NxListItem)
    set _listItems(items: any){
        this.children  = items.toArray();

        var anyReady = this.children.map((item) => item.itemReady);
        var anySelected = this.children.map((item) => item.itemSelected);

        Observable.from(anySelected)
                    .flatMap(x=> x)
                    .subscribe((item) => {

            let indexOfSelected = this.children.indexOf(item);
            this.children.forEach((row) => {
                let indexOfRow : number = this.children.indexOf(row);
                let distance : number = Math.abs(indexOfSelected - indexOfRow);
                if (distance > 1) {
                    return;
                }

                if(item === row) {
                    return;
                }

                this.AnimateCollection(row, distance);
            });

        });

    }

    private AnimateCollection(row : NxListItem, distance: number): void {
        var stackPanel: StackLayout = row.getNativeElement();
        setTimeout(()=> {
            stackPanel.animate({
                opacity: 1,
                duration: 100,
                translate: {
                    x : -15,
                    y: 0
                },
                curve: AnimationCurve.easeIn
            }).then(() => {
                return stackPanel.animate({
                    duration: 100,
                    translate: {
                        x: -200,
                        y: 0
                    },
                    opacity: 0,
                    curve: AnimationCurve.easeOut
                });
            }).then(() => {
                stackPanel.translateX = 0;
                return stackPanel.animate({
                    duration: 200,
                    translate: {
                        x: 0,
                        y: 0
                    },
                    opacity: 1,
                    curve: AnimationCurve.easeIn
                });
            });


        }, (25*distance));


    }
}

export interface ISearchEvent {
    Value: string;
}