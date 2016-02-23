import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component, View} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";
import {NxNav} from "../../controls/nav/nav";
import {NxList} from "../../controls/list/list";
import {NxListItem} from "../../controls/list/list-item";
import {NxHeader} from "../../controls/list/header";
import {IonIcon,NavIcon} from "../../controls/icons/ion-icon";

import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {NxCard} from "../../controls/card/card";
//import {TitleTransform} from "../../pipes/title";
@Page({
    selector: "start",
    //move directives to App .. 
    directives: [NxCard, NxNav, NxList, NxListItem, NxHeader, IonIcon],
    templateUrl: "pages/startPage/startPage.html"
})
export class StartPage 
{
    constructor(private logger:Logger, private http: Http, private router: Router)
    {
        this.logger.Notify("Start Page - constructor hit"); 
        
        let base = Settings.WebApiBaseUrl;
        let endpoint  = "/Api/Providers/List/Enabled";
        let route = base + endpoint;
        
        this.logger.Notify("Load :" + route);
        
        this.http.get(route).map(x=> x.json()).subscribe((items: any) => {
            console.log('items: ' + items);          
            console.log(items.length);
        });
        
        //var observableRequest = this.http.get(route);
        let observableRequest = this.http.get(route);  
    }
    
    public pageLoaded(args: any): void {
        this.logger.Notify("start page - loaded");
        console.log("start page - loaded - i happen alot?");
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
    
    public incomplete(args: EventData) : void {
        alert("Its not made yet");
    }
    
    
}


//var vmModule = require("./main-view-model");
// export function pageLoaded(args) {
//     var page = args.object;
//     var vm = new startPage();
//     page.bindingContext = vm;
// }

//exports.pageLoaded = pageLoaded;
