import { Component, ElementRef, EventEmitter, Input, ViewChild } from "@angular/core";
import { IonIcon, NavIcon } from "../icons/ion-icon";
import { Observable, Subject, Subscription } from "rxjs/Rx";

import { Logger } from "../../providers/logger";
import { MaterialIcon } from "../icons/material-icon";
import { NxNavBack } from "./nav-back";
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    selector:"nx-nav",
    styleUrls: ["nav.common.css"],
    template:`
        <StackLayout class="nx-nav-wrapper">
            <StackLayout class="nx-nav nx-nav-row1">
                <GridLayout rows="*" columns="*,*,*">
                    <StackLayout orientation="horizontal" col="0"  verticalAlignment="center">
                        <nx-nav-back></nx-nav-back>
                        <nx-icon item-right icon="menu" (tap)="menuButtonTap($event)"></nx-icon>
                    </StackLayout>

                    <StackLayout orientation="horizontal" col="1" verticalAlignment="center">
                        <ng-content select="[main-header]"></ng-content>
                    </StackLayout>

                    <StackLayout orientation="horizontal" col="2" class="text-right" verticalAlignment="center">
                        <ng-content select="[nav-right]"></ng-content>
                    </StackLayout>
                </GridLayout>
            </StackLayout>
            <!-- Page titles etc --->
            <StackLayout class="nx-nav nx-nav-row2" verticalAlignment="center">
                <ng-content></ng-content>
            </StackLayout>
        </StackLayout>
    `,
    inputs: [ "showBack", "showMenu", "title" ],
    outputs: [ "showLeftSidebar", "showRightSidebar" ]
})
export class NxNav {
    @ViewChild("item") private container: ElementRef;

    @Input("showSubHeader")
    public ShowSubheader : boolean = true;

    public constructor(
        private element: ElementRef,
        private logger: Logger,
        private page : Page) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.actionBar.update();
    }

    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;

    public showLeftSidebar = new EventEmitter();
    public showRightSidebar = new EventEmitter();

    public menuSelected = new Subject<boolean>();

    public menuButtonTap(args: any): void {
        this.menuSelected.next(true);
    }
}