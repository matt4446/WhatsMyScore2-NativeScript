import * as Rx from "rxjs/Rx";

import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { AnimationPromise } from "ui/animation";
import {AppRoutingService} from "../../context/router.context";
import { Button } from "ui/button";
import { Component } from "@angular/core";
import { ContentChildren } from "@angular/core";
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";
import { Logger } from "../../providers/logger";
import { NxNav } from "../nav/nav";
import {PageRoute} from "nativescript-angular";
import { PanGestureEventData } from "ui/gestures";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { StackLayout } from "ui/layouts/stack-layout";
import { ViewChild } from "@angular/core";

@Directive({
    selector : "[nx-drawer-close]",
})
export class NxCloseDrawer {
}

@Component({
    selector:"nx-drawer",
    moduleId: module.id,
    styleUrls: ["drawer.common.css"],
    template:`
        <RadSideDrawer #main [transition]="sideDrawerTransition" tkExampleTitle tkToggleNavButton>
            <!-- drawer -->
            <StackLayout tkDrawerContent class="side-page" #asideLeft>
                <ng-content select="[drawer-aside-left]"></ng-content>
            </StackLayout>
            <!-- end of drawer -->
            <!-- main content -->
            <StackLayout #centerContent tkMainContent>
                <ng-content></ng-content>
            </StackLayout>
            <!-- Main content -->
        </RadSideDrawer>
    `
})
export class NxDrawer {
    private childNavs : Array<NxNav>;
    private asideLeftContent : ElementRef;
    private asideRightContent: ElementRef;
    private centerContent: ElementRef;
    private sidebar : RadSideDrawerComponent;

    public constructor(
        private logger: Logger,
        private pageRoute: PageRoute,
        private context : AppRoutingService) {

        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe((params) => {
                context.UpdateFromParams(params);
            });
    }

    private State = {
        Open : false,
        HasLeft : false,
        HasRight: false,
        NavAttached: false
    };

    public OpenLeftAside():void {
        this.sidebar.sideDrawer.toggleDrawerState();
    }

    public CloseLeftAside():void {
        this.sidebar.sideDrawer.toggleDrawerState();
    }

    private ngOnInit():void {
    } 

    @ViewChild("asideLeft")
    set _asideLeft(item: ElementRef){
        this.asideLeftContent = item;
        this.State.HasLeft = true;
    }

    @ViewChild("asideRight")
    set _asideRight(item: ElementRef){
        this.asideRightContent = item;
        this.State.HasRight = true;
    }

    @ViewChild("centerContent")
    set _setCenter(item: ElementRef){
        this.centerContent = item;
    }

    @ViewChild(RadSideDrawerComponent)
    set _setMain(item: RadSideDrawerComponent){
        this.sidebar = item;
    }

    @ContentChildren(NxNav)
    set _setNav(items: any) {
        if(this.State.NavAttached){ return; }

        ///this.logger.Notify("drawer.nav set: " + items);
        this.State.NavAttached = true;
        this.childNavs = items.toArray();

        var anySelected = this.childNavs.map((item) => item.menuSelected);

        Rx.Observable.from(anySelected).flatMap(x=>x).subscribe(() => {
            this.logger.Notify("nav menu tapped -> open side");

            if(this.State.Open) {
                this.CloseLeftAside();
            } else {
                this.OpenLeftAside();
            }

        });
    }
}