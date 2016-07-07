import { Control } from "../../decorators/control";
import { EventEmitter, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from '@angular/core';
import { Logger} from "../../providers/logger";
import { IonIcon,NavIcon} from "../icons/ion-icon";
import { Observable, Subscription, Subject} from 'rxjs/Rx';
import {Router, Instruction} from "@angular/router-deprecated";
import {NxNavBack} from "./nav-back";
import {Page} from "ui/page";

@Control({
    selector:"nx-nav",
    styleUrls: ["./controls/nav/nav.common.css"], 
    template:`
        <ActionBar title="">
            <StackLayout orientation="horizontal">
                <StackLayout>
                    <ng-content select="[nav-left]"></ng-content>
                    <nx-nav-back></nx-nav-back>
                </StackLayout>
                <StackLayout>
                    <ng-content></ng-content>
                </StackLayout>                
                <StackLayout>
                    <ng-content select="[nav-right]"></ng-content>    
                </StackLayout>                
                
            </StackLayout>
        </ActionBar>
    `,

    //create 1 row template; 3 columns; 2 for the icons on the sides
    // template: `
    //     <StackLayout>
    //         <StackLayout class="nx-nav">
    //             <StackLayout #nav>
    //                 <GridLayout rows="auto" class="nx-nav-inner">
    //                     <StackLayout class="icon-column" style="vertical-align:center;horizontal-align:left;padding-left:14" orientation="horizontal">
    //                         <nx-nav-back></nx-nav-back>
                            
    //                         <ion-icon nav="true" (tap)="tapWrapper($event)" icon="ion-android-menu"></ion-icon>
                            
    //                         <ng-content select="[nav-left]"></ng-content>
    //                     </StackLayout>
    //                     <StackLayout style="vertical-align:center;horizontal-align:center">
    //                         <ng-content></ng-content>
    //                     </StackLayout>
    //                     <StackLayout class="icon-column" style="vertical-align:center;horizontal-align:right;padding-right:14">
    //                         <ng-content select="[nav-right]"></ng-content>
    //                     </StackLayout>
    //                 </GridLayout>
    //             <StackLayout>
    //         </StackLayout>
    //         <Border borderRadius="0" borderWidth="2" borderColor="#eeeeee">
    //         </Border>
    //     </StackLayout>
    // `,
    directives: [IonIcon,NavIcon, NxNavBack],
    providers: [],
    inputs: [ "showBack", "showMenu", "title" ],
    outputs: [ "showLeftSidebar", "showRightSidebar" ]
})
export class NxNav {
    @ViewChild('item') private container: ElementRef

    public constructor(
        private router: Router, 
        private element: ElementRef,
        private logger: Logger,
        private page : Page) {
            
        
        //this.logger.Notify("nx-nav");
    }
    
    ngOnInit() {
        //this.page.actionBarHidden = true;
        //this.page.actionBar.update();
    }
      
    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;
        
    //public MenuSelected: Subject<any> = new Subject<any>();
    public showLeftSidebar = new EventEmitter();
    public showRightSidebar = new EventEmitter();
       
    public menuSelected = new Subject<boolean>();
       
    public tapWrapper = (args: any) => {
        //this.logger.Notify("tap clicked on menu");
        this.menuSelected.next(true);
        
    };
        
    private ngAfterViewInit()
    {
        
    }
}