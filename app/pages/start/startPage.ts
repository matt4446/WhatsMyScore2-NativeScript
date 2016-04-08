import {Observable, EventData } from "data/observable";
import {alert} from "ui/dialogs";

import {Inject, Component} from 'angular2/core';
import {Page} from "../../decorators/page";
import {Logger} from "../../providers/logger";
import {Router} from "angular2/router";

import {Http} from 'angular2/http';
import {Settings} from "../../providers/routes/routes";
import {NxDrawer} from "../../controls/drawer/drawer";
import {StartNav} from "../nav/start.nav"
import {topmost} from "ui/frame";
import {ActionItem} from "ui/action-bar";

import {} from "../../"
@Page({
    selector: "start",
    //I've moved directives to Page decorator .. 
    templateUrl: "pages/start/page.html",
    directives: [StartNav]
})
export class StartPage 
{
    constructor(private logger:Logger, private http: Http, private router: Router)
    {
        this.logger.Notify("Start Page - constructor hit"); 
    }
        
    public loadRegions(args: EventData) : void{
        this.logger.Notify("time to load regions");
        
        if(args){ 
            this.logger.Notify("There are args");
            //to do animate transition
        }
        
        let promise: Promise<any> = this.router.navigate(["Regions"]);
        
        promise.then(() => {
            this.logger.Notify("I Should have navigated from start -> regions");
        });
        
        promise.catch((e) => {
            this.logger.Error(e);
            this.logger.Notify("I failed navigating from start -> regions");
        });
    }
    
    public incomplete(args: EventData) : void {
        alert("Its not made yet");
    }
  
}
