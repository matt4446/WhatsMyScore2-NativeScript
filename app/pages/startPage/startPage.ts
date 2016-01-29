import {Observable, EventData } from "data/observable";
import {Inject, Component, View} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";
import {NxNav} from "../../controls/nav/nav";
import {NxList} from "../../controls/list/list";
import {NxListItem} from "../../controls/list/list-item";
import {NxHeader} from "../../controls/list/header";
import {IonIcon} from "../../controls/icons/ion-icon";
//import {TitleTransform} from "../../pipes/title";

import pages = require("ui/page");

@Page({
    selector: "start",
    //move directives to App .. 
    directives: [NxList, NxListItem, NxHeader, IonIcon],
    templateUrl: "pages/startPage/startPage.html"
})
export class StartPage 
{
    constructor(private logger:Logger, private router: Router)
    {
        this.logger.Notify("Start Page - constructor hit");   
    }
    
    public pageLoaded(args: any): void {
        this.logger.Notify("start page - loaded");
        console.log("start page - loaded - i happen alot?");
        
        //var page = <pages.Page>args.object;
        // var page = args.object;
        // page.animate({
        //     translate: { x: 30, y:0 }
        // });
    }
    
    public loadRegions(args: EventData) : void{
        this.logger.Notify("time to load regions");
        
        if(args){ 
            this.logger.Notify("There are args");
            //to do animate transition
        }
        
        let promise: Promise<any, any> = this.router.navigate(["Regions"]);
        
        promise.then(() => {
            this.logger.Notify("I Should have navigated from start -> regions");
        });
        
        promise.catch(() => {
            this.logger.Notify("I failed navigating from start -> regions");
        });
    }
    
    
}


//var vmModule = require("./main-view-model");
// export function pageLoaded(args) {
//     var page = args.object;
//     var vm = new startPage();
//     page.bindingContext = vm;
// }

//exports.pageLoaded = pageLoaded;
