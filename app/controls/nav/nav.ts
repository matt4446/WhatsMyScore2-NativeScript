import { Control } from "../../decorators/control";
import {HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';

import { Logger} from "../../providers/logger";

@Directive({
    
})

@Control({
    selector:"nx-nav",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    template: `
    <Border borderRadius="0" borderWidth="1" borderColor="#eeeeee">
        <!-- main bar --> 
        <GridLayout columns="60, 32, *, 32" rows="auto" class="nx-nav">
            <StackLayout
            <StackLayout col="0" class="icon-column" style="vertical-align:center; ">
                <ng-content select="[nav-left]"></ng-content>
            </StackLayout>
            <StackLayout col="1">
                <ng-content select="title"></ng-content>
            </StackLayout>
            <StackLayout col="2" style="vertical-align:center">
                <ng-content select="[nav-right]"></ng-content>
            </StackLayout>
        </GridLayout>
        <!-- Sub header --> 
    </Border>
    `,
    providers: [],
    inputs: [ "showBack", "showMenu", "title" ]
})
export class NxNav {
    public constructor(private logger: Logger ){
        this.logger.Notify("NxNav started");
    }
        
    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;
}