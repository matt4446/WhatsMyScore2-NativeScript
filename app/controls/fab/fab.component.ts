import { Observable, Subscription, Subject} from 'rxjs/Rx';
import { Component, ViewChild, ElementRef, Directive, Input, Output, EventEmitter, ContentChildren } from "@angular/core";
import { registerElement, ViewClass } from "nativescript-angular/element-registry";
import { StackLayout} from "ui/layouts/stack-layout";
import { AnimationPromise } from "ui/animation";

registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
/*
    Material icons 
    http://google.github.io/material-design-icons/
*/
@Component({
    selector: "material-fab",
    template:`
    <AbsoluteLayout class="fab-container"
        [class.left]="horizontalAlign == 'left'"
        [class.right]="horizontalAlign == 'right'"
        [class.h-center]="horizontalAlign == 'center'"
        [class.top]="veritcalAlign == 'top'"
        [class.bottom]="veritcalAlign == 'bottom'"
        [class.v-center]="veritcalAlign == 'center'"
    >
        <StackLayout class="fab-button-content" style="z-index: 1;">
            <!--<ng-content></ng-content>
            -->
            <Label [text]="text" class="fab-icon material-icons md-light" 
                [class.md-18]="fontSize == 'md-18'"
                [class.md-24]="fontSize == 'md-24'"
                [class.md-36]="fontSize == 'md-36'"
                [class.md-48]="fontSize == 'md-48'"
            textWrap="false"></Label>
        </StackLayout>
    
        <GridLayout>
            <Fab #fab rippleColor="#f1f1f1" class="fab-button" (tap)="fabTap($event)">
            </Fab>
        </GridLayout>
    </AbsoluteLayout>
    `,
    outputs: ["tap"],
    styleUrls: ["./controls/fab/fab.common.css"],
})
export class MaterialFab {
    @Input("horizontal-align")
    public horizontalAlign : string = "right";
    @Input("vertical-align")
    public veritcalAlign : string = "top";
    
    @Input("text")
    public text : string = "face"
    
    @Input("font-size")
    public fontSize : string = "md-24"; 
        
    @ViewChild("fab")
    public element : ElementRef; 
    
    constructor()
    {
        console.log("material-fab - started");
    }
        
    public tapped($event){
        console.log("tapped on fab");
        this.tap.next($event);
    }
    
    public fabTap(){
        console.log("fab pressed");
        this.tap.next({
            source : this.element.nativeElement
        })
    }
       
    public tap = new EventEmitter(); 
}

