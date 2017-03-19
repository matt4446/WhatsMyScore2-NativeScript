import { Component, ContentChild, ElementRef, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { Logger } from "../../providers/logger";
import { MaterialIcon } from "../icons/material-icon";

@Component ({
    moduleId: module.id,
    selector:"nx-nav-back",
    styleUrls: ["nav.common.css"], 
    // template: `
    //     <ion-icon item-left icon="ion-chevron-left" ></ion-icon>
    // `,
    template: `
        <StackLayout orientation="horizontal" (tap)="back($event)">
            <Label text="chevron_left" [material-icon] class="title nav-icon nav-icon-bold"></Label>
            <Label text="Back" class="nav-icon-text title"></Label>
        </StackLayout>
    `,
    providers: [],
})
export class NxNavBack {
    
    public constructor(
        private location: Location,
        private element: ElementRef,
        private logger: Logger) {       
    }

    public back()
    {
        this.logger.Notify("Back");
        try{this.location.back();}
        catch(ex){}
        
        
    }
       
    public menuSelected = new Subject<boolean>();
       
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on menu");
        this.menuSelected.next(true);
        
    };
        
    private ngAfterViewInit()
    {
        
    }
}