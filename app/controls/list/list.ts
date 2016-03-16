import { Control } from "../../decorators/control";
import { Input, Output, EventEmitter, ContentChildren } from "angular2/core";
import { Logger } from "../../providers/logger";
import { NxListItem } from "./list-item";
import { NxHeader } from "./header";
//var observable = require("data/observable");
import { Observable, Subscription, Subject} from 'rxjs/Rx';

@Control({
    selector: "nx-list",
    //templateUrl: "controls/list/list.html",
    template:`
    <Border borderRadius="4" borderWidth="1" borderColor="#eeeeee" class="nx-list">
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
    </Border>
    `,
    directives: [ NxListItem, NxHeader ],
    //inputs:["padding"]
})
export class NxList {
    //@Input() //see @control - inputs
   
    
    constructor(private logger: Logger)
    {
        this.logger.Notify("NxList control Started");
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
        //this.logger.Notify("ngAfterContentInit");
        
        // this.children.forEach((item) => {
        //     var element = item.getNativeElement();
        //     element.animate({
        //         translate: { x: -10, y: 10 }
        //     });
        // });
    }
    
    public ngAfterContentChecked(){
        //this.logger.Notify("ngAfterContentChecked");
    }
    
    public ngAfterViewInit(){
        //this.logger.Notify("ngAfterViewInit");
    }
    
    public ngAfterViewChecked(){
        //this.logger.Notify("ngAfterViewChecked");
    }
    
    @ContentChildren(NxHeader)
    set _setHeader(items : any) {
        this.headers = items.toArray();
        
        // if(this.headers.length > 0){
        //     let top = this.headers[0];
        //     top.getNativeElement().borderRadius = 4;
            
        //     return;
        // }
    }
    //this should give me a list of shadow elements in ng-content
    @ContentChildren(NxListItem)
    set _listItems(items: any){
        this.logger.Notify("Setting list item nodes");
        this.children  = items.toArray();
        this.logger.Notify("" + this.children.length);
                
        var anyReady = this.children.map((item) => item.itemReady);
        var anySelected = this.children.map((item) => item.itemSelected);
                
        Observable.fromArray(anySelected).flatMap(x=> x).subscribe((item : NxListItem) => {
            this.logger.Notify("one of the items was selected");
            
            //get rid of all items except the selected one.
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
        
       
        //these items will be wrapped in a stack panel.
        // children.forEach((item : NxListItem) => {
        //     var stackPanel = item.Element;
        //     stackPanel.animate({
        //         opacity: 1,
        //         duration: 3000,
        //         translate: {
        //             x : 10,
        //             y: 0
        //         }
        //     })
        // });
        
    }
}

export interface ISearchEvent
{
    Value: string;
}