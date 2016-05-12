import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren } from "@angular/core";
import { Logger } from "../../providers/logger";
import { NxListItem } from "./list-item";
import { NxHeader } from "./header";
//var observable = require("data/observable");
import { Observable, Subscription, Subject } from 'rxjs/Rx';
//import { from } from "rxjs/observable/from";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/from';

@Control({
    selector: "nx-list",
    //templateUrl: "controls/list/list.html",
    template:`
    <Border borderRadius="4" borderWidth="1" borderColor="#eeeeee" class="nx-list">
    <GridLayout>
        <StackLayout>
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
        
    </GridLayout>
    </Border>
    `,
    directives: [ NxListItem, NxHeader ],
    //inputs:["padding"]
})
export class NxList {
    //@Input() //see @control - inputs

    constructor(private logger: Logger)
    {
        //this.logger.Notify("NxList control Started");
    }
    
    public padding : boolean = false;
    public children : Array<NxListItem>;
    public headers : Array<NxHeader>;
    // public HasPadding(){
    //     if(this.padding){
    //         return "padding";
    //     }
    // }   
    
    //https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
    public ngAfterContentInit(){
    }
    
    public ngAfterContentChecked(){
    }
    
    public ngAfterViewInit(){
    }
    
    public ngAfterViewChecked(){
    }
    
    @ContentChildren(NxHeader)
    set _setHeader(items : any) {
        this.headers = items.toArray();
    }
    //this should give me a list of shadow elements in ng-content
    @ContentChildren(NxListItem)
    set _listItems(items: any){
        this.children  = items.toArray();
                
        var anyReady = this.children.map((item) => item.itemReady);
        var anySelected = this.children.map((item) => item.itemSelected);
        
        Observable.from(anySelected).flatMap(x=> x).subscribe((item) => {
            
            this.children.forEach((row) => {
                if(item == row){
                    return;
                }
                
                var stackPanel = row.getNativeElement();
                
                stackPanel.animate({
                    opacity: 1,
                    duration: 100,
                    translate: {
                        x : 40,
                        y: 0
                    }
               }).then(() => {
                   return stackPanel.animate({
                       duration: 100,
                       translate: {
                           x: -200,
                           y: 0
                       },
                       opacity: 0
                   });
               }).then(() => {
                    stackPanel.translateX = 0;
                    return stackPanel.animate({
                        duration: 200,
                        translate: {
                            x: 0,
                            y: 0
                        },
                        opacity: 1
                    });
               });
               
                
            });
            
        });

    }
}

export interface ISearchEvent
{
    Value: string;
}