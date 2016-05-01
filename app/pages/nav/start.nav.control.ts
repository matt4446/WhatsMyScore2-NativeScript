import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component} from 'angular2/core';
import {PageControl} from "../../decorators/pageControl";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";


import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {NxDrawer} from "../../controls/drawer/drawer";
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

@PageControl({
    selector: "start-nav",
    templateUrl: "pages/nav/start.nav.control.html"
})
export class StartNav
{
    constructor(private logger:Logger, private http: Http, private router: Router)
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
        
    public loadRegions(args: EventData) : void{
        this.logger.Notify("time to load regions");
        
        
        let promise: Promise<any> = this.router.navigate(["Regions"]);
        
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
