import { Control } from "../../decorators/control";
import { EventEmitter, ViewChildren, ViewChild, ElementRef, HostListener, Host, Directive, Component, ContentChild, TemplateRef, ViewContainerRef} from 'angular2/core';
import { Logger} from "../../providers/logger";
import { IonIcon,NavIcon} from "../icons/ion-icon";
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Control({
    selector:"nx-nav",
    //create 1 row template; 3 columns; 2 for the icons on the sides
    template: `
        <StackLayout>
            <StackLayout class="nx-nav">
                <StackLayout #nav >

                    <GridLayout columns="42, *, 42" rows="auto" class="nx-nav-inner">
                        <StackLayout col="0" class="icon-column" style="vertical-align:center;horizontal-align:center">
                            <nx-nav-back></nx-nav-back>
                            <ion-icon nav="true" (tap)="tapWrapper($event)" icon="ion-android-menu"></ion-icon>
            
                            <ng-content select="[nav-left]"></ng-content>
                        </StackLayout>
                        <StackLayout col="1">
                            <ng-content></ng-content>
                        </StackLayout>
                        <StackLayout col="2" class="icon-column" style="vertical-align:center;horizontal-align:center">
                            <ng-content select="[nav-right]"></ng-content>
                        </StackLayout>
                    </GridLayout>
                   
                <StackLayout>
            </StackLayout>
            <Border borderRadius="0" borderWidth="2" borderColor="#eeeeee">
            </Border>
        </StackLayout>
    `,
    directives: [IonIcon,NavIcon],
    providers: [],
    inputs: [ "showBack", "showMenu", "title" ],
    outputs: [ "showLeftSidebar", "showRightSidebar" ]
})
export class NxNav {
    @ViewChild('item') private container: ElementRef

    public constructor(
        private element: ElementRef,
        private logger: Logger) {
            
        this.logger.Notify("nx-nav");
    }
      
    public title : string = "Default Title";
    public showBack : boolean = true;
    public showMenu : boolean = false;
        
    //public MenuSelected: Subject<any> = new Subject<any>();
    public showLeftSidebar = new EventEmitter();
    public showRightSidebar = new EventEmitter();
       
    public menuSelected = new Subject<boolean>();
       
    public tapWrapper = (args: any) => {
        this.logger.Notify("tap clicked on menu");
        this.menuSelected.next(true);
    };
        
    private ngAfterViewInit()
    {
        
    }
}