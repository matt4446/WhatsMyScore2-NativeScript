import { Component, ElementRef, EventEmitter, Input, ViewChild } from "@angular/core";
import { IonIcon, NavIcon } from "../icons/ion-icon";
import { Observable, Subject, Subscription } from "rxjs/Rx";

import { Logger } from "../../providers/logger";
import { MaterialIcon } from "../icons/material-icon";
import { NxNavBack } from "./nav-back";
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    selector: "nx-nav-row",
    styleUrls: ["nav.common.css"],
    template: `
    <FlexboxLayout class="nx-nav-row">
        <StackLayout class="nx-nav-col nx-nav-col1" orientation="horizontal" width="50">
            <ng-content select="[nav-row-left]"></ng-content>
        </StackLayout>
        <StackLayout flexGrow="1" class="nx-nav-col nx-nav-col2" orientation="horizontal">
            <ng-content select="[nav-row-title]"></ng-content>
        </StackLayout>
        <StackLayout class="nx-nav-col nx-nav-col3" orientation="horizontal" width="50">
            <ng-content select="[nav-row-right]"></ng-content>
        </StackLayout>
    </FlexboxLayout>
    `
})
export class NxNavRow {
}

@Component({
    moduleId: module.id,
    selector:"nx-nav",
    styleUrls: ["nav.common.css"],
    template:`
        <StackLayout class="nx-nav nx-nav-wrapper">
            <StackLayout class="row1">
                <nx-nav-row>
                    <nx-icon [nav-row-left] icon="menu" (tap)="menuButtonTap($event)"></nx-icon>
                    <ng-content [nav-row-title]></ng-content>
                    <ng-content [nav-row-right] select="[nav-right]"></ng-content>
                </nx-nav-row>
            </StackLayout>
            <StackLayout class="row2">
                <nx-nav-row>
                    <nx-nav-back [nav-row-left]></nx-nav-back>
                    <ng-content [nav-row-title]></ng-content>
                    <ng-content [nav-row-right] select="[nav-secondary-right]"></ng-content>
                </nx-nav-row>
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