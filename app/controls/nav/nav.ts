import { Control } from "../../decorators/control";
import { EventEmitter, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';

import { Logger} from "../../providers/logger";
import { NxTitle } from "./nav-title"
@Directive({
    
})

@Control({
    selector:"nx-nav",
    //create a 1 row template; 3 columns; 2 for the icons on the sides
    template: `
    <StackLayout>
        <StackLayout class="nx-nav">
            <StackLayout #nav >
                <!-- main bar --> 
                <GridLayout columns="42, *, 42" rows="auto" class="nx-nav-inner">
                    <StackLayout col="0" class="icon-column" style="vertical-align:center;horizontal-align:center">
                        <ng-content select="[nav-left]"></ng-content>
                    </StackLayout>
                    <StackLayout col="1">
                        <ng-content></ng-content>
                    </StackLayout>
                    <StackLayout col="2" class="icon-column" style="vertical-align:center;horizontal-align:center">
                        <ng-content select="[nav-right]"></ng-content>
                    </StackLayout>
                </GridLayout>
                <!-- Sub header --> 
                
            <StackLayout>
        </StackLayout>
        <Border borderRadius="0" borderWidth="2" borderColor="#eeeeee">
        </Border>
    </StackLayout>

    `,
    directives: [],
    providers: [],
    inputs: [ "showBack", "showMenu", "title" ],
    outputs: [ "showLeftSidebar", "showRightSidebar" ]
})
export class NxNav {
    @ViewChild('item') private container: ElementRef

    public constructor(private logger: Logger ){
        this.logger.Notify("nx-nav");
    }
      
    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;
        
        
    public showLeftSidebar = new EventEmitter();
    public showRightSidebar = new EventEmitter();
        
    private ngAfterViewInit()
    {
        
    }
}